// Runs Python in the browser with Pyodide inside a Web Worker, so a slow or
// endless program can never freeze the page. One worker is shared by all code
// blocks; each run gets a fresh set of globals.

const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/";
const LOAD_TIMEOUT_MS = 45_000;
const RUN_TIMEOUT_MS = 10_000;

const WORKER_SOURCE = `
importScripts("${PYODIDE}pyodide.js");
let py = null;
const ready = loadPyodide({ indexURL: "${PYODIDE}" }).then((p) => {
  py = p;
  py.setStdin({ stdin: () => null });
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
    await py.runPythonAsync(code, { globals: ns });
    postMessage({ type: "result", id, ok: true, out });
  } catch (err) {
    postMessage({ type: "result", id, ok: false, out, error: String((err && err.message) || err) });
  } finally {
    ns.destroy();
  }
};
`;

export type RunResult = { ok: boolean; out: string; error?: string };

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
        p.resolve({ ok: msg.ok, out: msg.out, error: msg.error ? trimTraceback(msg.error) : undefined });
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
        error: `Stopped after ${RUN_TIMEOUT_MS / 1000} seconds. Is there a loop that never ends?`,
      });
    }, RUN_TIMEOUT_MS);
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
