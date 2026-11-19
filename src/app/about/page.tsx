import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import { authorLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Pythonmates",
  description:
    "Pythonmates is a free, modern Python academy by Saurabh Jaiswal: tested lessons, runnable code, exercises and a path to Python for AI.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", name: "About Pythonmates", mainEntity: authorLd }} />
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">About</span>
          <h1>Why Pythonmates exists</h1>
          <p>Python is the base of modern AI. Learning it properly is still worth it — maybe more than ever.</p>
        </div>
      </section>
      <div className="wrap section prose">
        <p>
          Pythonmates started as a set of Python tutorials. It&apos;s now a free, modern Python academy: short lessons with code you can run in your browser, exercises that check your
          answer and quizzes that tell you when you&apos;re ready to move on.
        </p>

        <h2>How lessons are made</h2>
        <ul>
          <li>Every lesson starts with a short, direct answer, then explains with examples.</li>
          <li>All examples and exercise solutions are run and their output checked before publishing.</li>
          <li>Code follows current Python style: f-strings, snake_case, type hints where they help. Lessons are tested on Python {site.pythonVersion}.</li>
          <li>Code runs in your browser with Pyodide, a version of Python built for the web. Nothing is sent to a server.</li>
        </ul>

        <h2>Learning Python in the age of AI</h2>
        <p>
          AI assistants can write a lot of code. To trust that code you need to read it, test it and know when it&apos;s
          wrong. That&apos;s exactly what these lessons train. Pythonmate, an AI tutor that knows each lesson, is in
          development.
        </p>

        <h2>Who writes it</h2>
        <p>
          I&apos;m <a href={site.author.url}>{site.author.name}</a> — a freelance AI consultant and the author of{" "}
          <a href={site.author.book} rel="noopener">
            AI for Real Work
          </a>
          . I&apos;ve used Python for more than 15 years, from defence research to banks and tech companies, and spoke
          at PyCon. Connect on <a href={site.author.linkedin}>LinkedIn</a>.
        </p>

        <h2>The mates family</h2>
        <p>
          Pythonmates teaches Python. <a href={site.aimates}>AIMates</a> helps professionals use AI tools at work. Both
          are free to use.
        </p>

        <p style={{ marginTop: 36 }}>
          <Link href="/learn/beginner/what-is-python/" className="btn btn-primary">
            Start the first lesson
          </Link>
        </p>
      </div>
    </>
  );
}
