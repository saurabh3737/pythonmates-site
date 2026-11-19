"use client";

import { ListChecks } from "lucide-react";
import { useState } from "react";

import RichText from "@/components/RichText";
import type { QuizQuestion } from "@/content/types";

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const answered = picked.filter((p) => p !== null).length;
  const correct = picked.filter((p, i) => p === questions[i].answer).length;

  return (
    <section className="quiz" id="quiz" aria-labelledby="quiz-title">
      <h2 id="quiz-title" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ListChecks size={24} /> Quick check
      </h2>
      {questions.map((q, qi) => {
        const choice = picked[qi];
        return (
          <div className="q" key={qi}>
            <h3>
              {qi + 1}. <RichText text={q.q} />
            </h3>
            <div className="q-opts">
              {q.options.map((opt, oi) => {
                let cls = "q-opt";
                if (choice !== null && oi === q.answer) cls += " right";
                else if (choice === oi) cls += " wrong";
                return (
                  <button
                    type="button"
                    key={oi}
                    className={cls}
                    disabled={choice !== null}
                    onClick={() => setPicked(picked.map((p, i) => (i === qi ? oi : p)))}
                  >
                    <RichText text={opt} />
                  </button>
                );
              })}
            </div>
            {choice !== null && (
              <p className="q-why">
                {choice === q.answer ? "Correct. " : "Not quite. "}
                <RichText text={q.why} />
              </p>
            )}
          </div>
        );
      })}
      {answered === questions.length && (
        <p className="score">
          You scored {correct} / {questions.length}.
          {correct === questions.length ? " Ready for the next lesson!" : " Re-read the sections you missed, then move on."}
        </p>
      )}
    </section>
  );
}
