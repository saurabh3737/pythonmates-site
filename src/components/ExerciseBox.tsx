"use client";

import { Dumbbell, Lightbulb, Play, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

import { handleTab } from "@/components/CodeBlock";
import RichText from "@/components/RichText";
import type { Exercise } from "@/content/types";
import { preloadPython, runPython } from "@/lib/pyRunner";
import { askTutor, tutorPrompts } from "@/lib/tutorBus";

function normalise(s: string): string {
  return s
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim();
}

export default function ExerciseBox({
  exercise,
  title = "Practice",
  tutor = false,
}: {
  exercise: Exercise;
  title?: string;
  tutor?: boolean;
}) {
  const [code, setCode] = useState(exercise.starter);
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<"pass" | "fail" | null>(null);
  const [hints, setHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  async function check() {
    setBusy(true);
    const r = await runPython(code);
    const out = (r.out + (r.error ?? "")).trimEnd();
    setOutput(out);
    setStatus(r.ok && normalise(r.out) === normalise(exercise.expected) ? "pass" : "fail");
    setBusy(false);
  }

  return (
    <section className="exercise" id="exercise" aria-labelledby="exercise-title" onMouseEnter={preloadPython}>
      <h2 id="exercise-title">
        <Dumbbell size={24} /> {title}
      </h2>
      <p>
        <RichText text={exercise.prompt} />
      </p>
      <div className="expected">
        Expected output:
        <pre>{exercise.expected}</pre>
      </div>

      <div className="code">
        <div className="code-bar">
          <span className="label">Your code</span>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setCode(exercise.starter);
              setOutput(null);
              setStatus(null);
            }}
            aria-label="Start again"
          >
            <RotateCcw size={14} />
          </button>
          <button type="button" className="btn btn-sm btn-run" onClick={check} disabled={busy}>
            <Play size={14} /> {busy ? "Checking…" : "Run & check"}
          </button>
        </div>
        <textarea
          value={code}
          spellCheck={false}
          aria-label="Write your solution"
          rows={Math.max(6, code.split("\n").length + 2)}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => handleTab(e, check)}
        />
        {output !== null && (
          <div className={status === "pass" ? "out ok" : "out error"} aria-live="polite">
            <div className="out-label">
              <span>Your output</span>
            </div>
            <pre>{output || "(no output)"}</pre>
          </div>
        )}
      </div>

      {status === "pass" && <div className="result pass">Correct — nicely done! Try the quiz below next.</div>}
      {status === "fail" && (
        <div className="result fail">Not quite yet. Compare your output with the expected output, or take a hint.</div>
      )}

      <div className="row">
        {hints < exercise.hints.length && (
          <button type="button" className="btn btn-sm" onClick={() => setHints(hints + 1)}>
            <Lightbulb size={14} /> {hints === 0 ? "Get a hint" : "Another hint"}
          </button>
        )}
        {tutor && status === "fail" && (
          <button type="button" className="btn btn-sm btn-tutor" onClick={() => askTutor(tutorPrompts.hint(code, output ?? ""))}>
            <Sparkles size={14} /> Ask PythonMate for a hint
          </button>
        )}
        <button type="button" className="btn btn-sm" onClick={() => setShowSolution(!showSolution)}>
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
      </div>

      {hints > 0 && (
        <div className="hints">
          {exercise.hints.slice(0, hints).map((h, i) => (
            <div className="hint" key={i}>
              <b>Hint {i + 1}</b>
              <RichText text={h} />
            </div>
          ))}
        </div>
      )}

      {showSolution && (
        <div className="code">
          <div className="code-bar">
            <span className="label">One possible solution</span>
            <button type="button" className="btn btn-sm" onClick={() => setCode(exercise.solution)}>
              Use it
            </button>
          </div>
          <pre>{exercise.solution}</pre>
        </div>
      )}
    </section>
  );
}
