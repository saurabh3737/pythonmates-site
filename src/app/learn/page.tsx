import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import { pathIcons } from "@/components/pathIcons";
import { publishedIn } from "@/content/lessons";
import { pathName, paths } from "@/content/paths";
import { breadcrumbLd, itemListLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Learn Python — free learning paths from beginner to AI",
  description:
    "Four free Python learning paths: Beginner, Intermediate, Advanced and Python for AI. Every lesson has code you can run, an exercise and a quiz.",
  alternates: { canonical: "/learn/" },
};

export default function LearnPage() {
  return (
    <>
      <JsonLd
        data={itemListLd(
          "Python learning paths",
          paths.map((p) => ({ name: pathName(p), path: `/learn/${p.id}/` })),
        )}
      />
      <JsonLd data={breadcrumbLd([{ name: "Learn", path: "/learn/" }])} />
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
        <div className="cards paths-grid">
          {paths.map((p) => {
            const done = publishedIn(p.id).length;
            return (
              <Link key={p.id} href={`/learn/${p.id}/`} className={`card path-card path-${p.id}`}>
                <span className="card-icon">{pathIcons[p.id]}</span>
                <span className="tag">{p.level}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span className="meter" aria-hidden="true">
                  <span style={{ width: `${Math.round((done / p.outline.length) * 100)}%` }} />
                </span>
                <span className="card-meta">
                  {done} of {p.outline.length} lessons ready <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
