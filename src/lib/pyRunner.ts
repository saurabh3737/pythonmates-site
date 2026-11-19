// Runs Python in the browser with Pyodide inside a Web Worker, so a slow or
// endless program can never freeze the page. One worker is shared by all code
// blocks; each run gets a fresh set of globals.

const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/";
const LOAD_TIMEOUT_MS = 45_000;
const RUN_TIMEOUT_MS = 10_000;
const PACKAGE_RUN_TIMEOUT_MS = 60_000; // first import of a big package downloads it

const WORKER_SOURCE = `
importScripts("${PYODIDE}pyodide.js");
let py = null;
const FIGS = [
  "import sys",
  "_imgs = []",
  "if 'matplotlib.pyplot' in sys.modules:",
  "    import io, base64",
  "    import matplotlib.pyplot as _plt",
  "    for _n in _plt.get_fignums():",
  "        _b = io.BytesIO()",
  "        _plt.figure(_n).savefig(_b, format='png', dpi=110, bbox_inches='tight')",
  "        _imgs.append(base64.b64encode(_b.getvalue()).decode())",
  "    _plt.close('all')",
  "_imgs",
].join("\\n");
const ready = loadPyodide({ indexURL: "${PYODIDE}" }).then((p) => {
  py = p;
  py.setStdin({ stdin: () => null });
  // Charts render off-screen; we send them back as PNG images.
  py.runPython("import os, warnings; os.environ['MPLBACKEND'] = 'AGG'; warnings.filterwarnings('ignore', message='.*non-interactive.*')");
  postMessage({ type: "ready" });
});
onmessage = async (e) => {
  const { id, code } = e.data;
  await ready;
  let out = "";
  py.setStdout({ batched: (s) => { out += s + "\\n"; } });
  py.setStderr({ batched: (s) => { out += s + "\\n"; } });
  const ns = py.globals.get("dict")();
  try {
    // Loads packages the code imports (numpy, pandas, pytest...) from the Pyodide CDN.
    await py.loadPackagesFromImports(code);
    await py.runPythonAsync(code, { globals: ns });
    let images = [];
    if (code.includes("matplotlib")) {
      const figs = await py.runPythonAsync(FIGS, { globals: ns });
      images = figs.toJs();
      figs.destroy();
    }
    postMessage({ type: "result", id, ok: true, out, images });
  } catch (err) {
    postMessage({ type: "result", id, ok: false, out, error: String((err && err.message) || err) });
  } finally {
    ns.destroy();
  }
};
`;

export type RunResult = { ok: boolean; out: string; error?: string; images?: string[] };

type Pending = { resolve: (r: RunResult) => void; timer: ReturnType<typeof setTimeout> };

let worker: Worker | null = null;
let readyPromise: Promise<void> | null = null;
let nextId = 1;
const pending = new Map<number, Pending>();

function reset(): void {
  worker?.terminate();
  worker = null;
  readyPromise = null;
}

function start(): Promise<void> {
  if (readyPromise) return readyPromise;
  readyPromise = new Promise<void>((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: "text/javascript" }));
    const w = new Worker(url);
    worker = w;
    const loadTimer = setTimeout(() => {
      reset();
      reject(new Error("Python took too long to load. Check your connection and try again."));
    }, LOAD_TIMEOUT_MS);
    w.onmessage = (e: MessageEvent) => {
      const msg = e.data;
      if (msg.type === "ready") {
        clearTimeout(loadTimer);
        resolve();
      } else if (msg.type === "result") {
        const p = pending.get(msg.id);
        if (!p) return;
        clearTimeout(p.timer);
        pending.delete(msg.id);
        p.resolve({
          ok: msg.ok,
          out: msg.out,
          error: msg.error ? trimTraceback(msg.error) : undefined,
          images: msg.images,
        });
      }
    };
    w.onerror = () => {
      clearTimeout(loadTimer);
      reset();
      reject(new Error("Python couldn't start in this browser."));
    };
  });
  return readyPromise;
}

/** Warm up Pyodide early (e.g. on hover) so the first Run feels fast. */
export function preloadPython(): void {
  if (typeof window !== "undefined") start().catch(() => undefined);
}

export async function runPython(code: string): Promise<RunResult> {
  try {
    await start();
  } catch (e) {
    return { ok: false, out: "", error: (e as Error).message };
  }
  const w = worker;
  if (!w) return { ok: false, out: "", error: "Python isn't available. Try again." };
  const id = nextId++;
  const limit = /^\s*(import|from)\s+(numpy|pandas|matplotlib|sklearn|scipy|pytest|pydantic)\b/m.test(code)
    ? PACKAGE_RUN_TIMEOUT_MS
    : RUN_TIMEOUT_MS;
  return new Promise<RunResult>((resolve) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      // An endless loop can't be interrupted politely: restart the worker.
      for (const p of pending.values()) {
        clearTimeout(p.timer);
        p.resolve({ ok: false, out: "", error: "Cancelled." });
      }
      pending.clear();
      reset();
      resolve({
        ok: false,
        out: "",
        error: `Stopped after ${limit / 1000} seconds. Is there a loop that never ends?`,
      });
    }, limit);
    pending.set(id, { resolve, timer });
    w.postMessage({ id, code });
  });
}

/** Keep only the learner's part of a Pyodide traceback. */
function trimTraceback(msg: string): string {
  const lines = msg.trimEnd().split("\n");
  const first = lines.findIndex((l) => l.includes('File "<exec>"'));
  if (first === -1) return lines.slice(-4).join("\n");
  return ["Traceback (most recent call last):", ...lines.slice(first)].join("\n");
}
