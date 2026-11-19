import type { Metadata } from "next";
import Link from "next/link";

import ExerciseBox from "@/components/ExerciseBox";
import { lessonUrl, publishedLessons } from "@/content/lessons";

export const metadata: Metadata = {
  title: "Python exercises with solutions — practise in your browser",
  description:
    "Free Python practice exercises with automatic checking, hints and solutions. Write and run your code in the browser — no install needed.",
  alternates: { canonical: "/practice/" },
};

export default function PracticePage() {
  const lessons = publishedLessons();
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Practice</span>
          <h1>Python exercises</h1>
          <p>
            Every exercise checks your output automatically and has three hints before the solution. Stuck? Open the
            lesson it comes from.
          </p>
        </div>
      </section>
      <div className="wrap" style={{ maxWidth: 820 }}>
        {lessons.map((l) => (
          <div key={`${l.path}/${l.slug}`}>
            <ExerciseBox exercise={l.exercise} title={l.title} />
            <p className="muted" style={{ fontSize: 14 }}>
              From the lesson <Link href={lessonUrl(l)}>{l.title}</Link>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
