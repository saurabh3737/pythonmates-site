"use client";

import { Check, Copy, Pencil, Play, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

import { highlightPython, escapeHtml } from "@/lib/highlight";
import { preloadPython, runPython, type RunResult } from "@/lib/pyRunner";
import { askTutor, tutorPrompts } from "@/lib/tutorBus";

type Props = {
  code: string;
  output?: string;
  file?: string;
  run?: boolean;
  tutor?: boolean; // show PythonMate buttons (lesson pages only)
};

export function handleTab(e: React.KeyboardEvent<HTMLTextAreaElement>, onRun?: () => void) {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && onRun) {
    e.preventDefault();
    onRun();
    return;
  }
  if (e.key !== "Tab" || e.shiftKey) return;
  e.preventDefault();
  const el = e.currentTarget;
  const { selectionStart: s, selectionEnd: end, value } = el;
  el.value = value.slice(0, s) + "    " + value.slice(end);
  el.selectionStart = el.selectionEnd = s + 4;
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

export default function CodeBlock({ code, output, file, run, tutor }: Props) {
  const [value, setValue] = useState(code);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [copied, setCopied] = useState(false);
  const isShell = file === "terminal";

  async function onRun() {
    setBusy(true);
    setResult(await runPython(value));
    setBusy(false);
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked: ignore */
    }
  }

  function onReset() {
    setValue(code);
    setResult(null);
    setEditing(false);
  }

  const html = isShell ? escapeHtml(value) : highlightPython(value);
  const shownOutput = result ? (result.out + (result.error ?? "")).trimEnd() : output;
  const outClass = result ? (result.ok ? "out ok" : "out error") : "out";

  return (
    <div className="code" onMouseEnter={run ? preloadPython : undefined}>
      <div className="code-bar">
        <span className="label">{file ?? "Python"}</span>
        {run && value !== code && (
          <button type="button" className="btn btn-sm" onClick={onReset} aria-label="Reset code">
            <RotateCcw size={14} />
          </button>
        )}
        {tutor && !isShell && (
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => askTutor(tutorPrompts.explain(value))}
            title="Ask PythonMate to explain this code"
          >
            <Sparkles size={14} /> Explain
          </button>
        )}
        <button type="button" className="btn btn-sm" onClick={onCopy} aria-label="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        {run && !editing && (
          <button type="button" className="btn btn-sm" onClick={() => setEditing(true)}>
            <Pencil size={14} /> Edit
          </button>
        )}
        {run && (
          <button type="button" className="btn btn-sm btn-run" onClick={onRun} disabled={busy}>
            <Play size={14} /> {busy ? "Running…" : "Run"}
          </button>
        )}
      </div>
      {editing ? (
        <textarea
          value={value}
          spellCheck={false}
          aria-label="Edit the code"
          rows={Math.max(4, value.split("\n").length + 1)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleTab(e, onRun)}
        />
      ) : (
        <pre>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      )}
      {shownOutput !== undefined && (
        <div className={outClass} aria-live="polite">
          <div className="out-label">
            <span>{result ? (result.ok ? "Your output" : "Error") : "Output"}</span>
            {tutor && result && !result.ok && result.error && (
              <button
                type="button"
                className="out-explain"
                onClick={() => askTutor(tutorPrompts.error(value, result.error ?? ""))}
              >
                <Sparkles size={12} /> Explain this error
              </button>
            )}
          </div>
          <pre>{shownOutput || "(no output)"}</pre>
        </div>
      )}
      {result?.images?.map((img, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} className="plot" src={`data:image/png;base64,${img}`} alt="Chart produced by your code" />
      ))}
      {run && output === undefined && !result && busy && (
        <div className="out">
          <pre>Starting Python…</pre>
        </div>
      )}
    </div>
  );
}
