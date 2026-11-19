import type { Metadata } from "next";
import Link from "next/link";

import { pathIcons } from "@/components/pathIcons";
import { publishedIn } from "@/content/lessons";
import { paths } from "@/content/paths";

export const metadata: Metadata = {
  title: "Learn Python — free learning paths from beginner to AI",
  description:
    "Four free Python learning paths: Beginner, Intermediate, Advanced and Python for AI. Every lesson has code you can run, an exercise and a quiz.",
  alternates: { canonical: "/learn/" },
};

export default function LearnPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Learning paths</span>
          <h1>Learn Python, step by step</h1>
          <p>
            Pick a path. Each lesson takes about ten minutes and ends with an exercise and a quick quiz, all in your
            browser.
          </p>
        </div>
      </section>
      <section className="wrap section">
        <div className="cards">
          {paths.map((p) => {
            const done = publishedIn(p.id).length;
            return (
              <Link key={p.id} href={`/learn/${p.id}/`} className="card">
                <span className="card-icon">{pathIcons[p.id]}</span>
                <span className="tag">{p.level}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span className="card-meta">
                  {p.outline.length} lessons{done ? ` · ${done} ready` : " · coming soon"} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
