import { ArrowRight, Bot, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

import CodeBlock from "@/components/CodeBlock";
import JsonLd from "@/components/JsonLd";
import { pathIcons } from "@/components/pathIcons";
import { getLesson, lessonUrl, publishedIn, publishedLessons } from "@/content/lessons";
import { pathName, paths } from "@/content/paths";
import { itemListLd, websiteLd } from "@/lib/seo";
import { site } from "@/lib/site";

const demo = `name = "you"
skills = ["variables", "loops", "functions"]

print(f"Hello, {name}! Let's learn Python.")
for i, skill in enumerate(skills, start=1):
    print(f"{i}. {skill}")`;

const demoOutput = `Hello, you! Let's learn Python.
1. variables
2. loops
3. functions`;

const popular: [string, string][] = [
  ["beginner", "what-is-python"],
  ["beginner", "lists"],
  ["beginner", "functions"],
  ["intermediate", "classes"],
  ["intermediate", "decorators"],
  ["advanced", "async-await"],
  ["ai", "pandas"],
  ["ai", "llm-apis"],
  ["ai", "rag-basics"],
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Is PythonMates free?",
    a: "Yes. Every lesson, exercise and quiz is free, with no sign-up and no ads.",
  },
  {
    q: "Do I need to install Python to start?",
    a: "No. All examples and exercises run in your browser. When you're ready to build projects on your own computer, the first lesson shows how to install Python and uv.",
  },
  {
    q: "Which Python version do the lessons use?",
    a: `All lessons are written for modern Python and tested on Python ${site.pythonVersion}. Almost every example also works on Python 3.10 and newer.`,
  },
  {
    q: "Can I learn Python for AI and machine learning here?",
    a: "Yes. The Python for AI path covers NumPy, pandas, matplotlib, scikit-learn, calling LLM APIs, RAG and building AI APIs with FastAPI.",
  },
  {
    q: "How long does it take to learn Python?",
    a: "Each lesson takes 7–25 minutes. At a few lessons a week, most learners finish the Beginner path in two to four weeks and can write useful scripts by then.",
  },
  {
    q: "Should I still learn Python if AI can write code?",
    a: "Yes. AI assistants write code quickly, but you need to read, test and fix it. Knowing Python is what turns AI-generated code from risky into useful.",
  },
];

export default function Home() {
  const lessons = publishedLessons();
  const totalMinutes = lessons.reduce((n, l) => n + l.minutes, 0);

  return (
    <>
      <JsonLd data={websiteLd()} />
      <JsonLd
        data={itemListLd(
          "PythonMates learning paths",
          paths.map((p) => ({ name: pathName(p), path: `/learn/${p.id}/` })),
        )}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="hero hero-glow">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Free · Python {site.pythonVersion} · runs in your browser</span>
            <h1>
              Learn Python the <span>modern way</span>
            </h1>
            <p className="hero-lead">
              <strong>PythonMates</strong> is a free Python academy: short lessons, code you can run and change right
              on the page, exercises with hints and quizzes — from your very first line to Python for AI.
            </p>
            <div className="hero-actions">
              <Link href="/learn/beginner/what-is-python/" className="btn btn-primary">
                Start the first lesson <ArrowRight size={16} />
              </Link>
              <Link href="/learn/" className="btn">
                See all learning paths
              </Link>
            </div>
            <div className="hero-facts">
              <span>
                <CheckCircle2 size={16} /> No sign-up
              </span>
              <span>
                <CheckCircle2 size={16} /> Nothing to install
              </span>
              <span>
                <CheckCircle2 size={16} /> Every example tested
              </span>
            </div>
          </div>
          <div className="hero-code">
            <CodeBlock code={demo} output={demoOutput} file="Try it — press Run" run />
          </div>
        </div>
        <div className="wrap">
          <dl className="stats">
            <div>
              <dt>Lessons</dt>
              <dd>{lessons.length}</dd>
            </div>
            <div>
              <dt>Learning paths</dt>
              <dd>{paths.length}</dd>
            </div>
            <div>
              <dt>Hours of content</dt>
              <dd>{Math.round(totalMinutes / 60)}+</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>€0</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <span className="kicker">Learning paths</span>
          <h2>Four paths, one journey</h2>
          <p>Start where you are. Every path builds on the one before, ending with the Python you need for AI work.</p>
        </div>
        <div className="cards paths-grid">
          {paths.map((p, i) => {
            const done = publishedIn(p.id).length;
            const pct = Math.round((done / p.outline.length) * 100);
            return (
              <Link key={p.id} href={`/learn/${p.id}/`} className={`card path-card path-${p.id}`}>
                <span className="path-step">Step {i + 1}</span>
                <span className="card-icon">{pathIcons[p.id]}</span>
                <span className="tag">{p.level}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span className="meter" aria-hidden="true">
                  <span style={{ width: `${pct}%` }} />
                </span>
                <span className="card-meta">
                  {done} of {p.outline.length} lessons ready <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <span className="kicker">How it works</span>
          <h2>How every lesson works</h2>
          <p>Reading alone doesn&apos;t make you a programmer. Each lesson makes you write code.</p>
        </div>
        <div className="steps">
          <div className="card">
            <h3>Read</h3>
            <p>A short answer first, then clear explanations with modern Python.</p>
          </div>
          <div className="card">
            <h3>Run</h3>
            <p>Press Run on any example, change it and see what happens.</p>
          </div>
          <div className="card">
            <h3>Practise</h3>
            <p>Solve an exercise with a three-step hint ladder when you get stuck.</p>
          </div>
          <div className="card">
            <h3>Check</h3>
            <p>A quick quiz tells you if you&apos;re ready for the next lesson.</p>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <span className="kicker">Popular lessons</span>
          <h2>Jump straight in</h2>
          <p>Some of the most useful lessons across all four paths.</p>
        </div>
        <ul className="popular">
          {popular.map(([pathId, slug]) => {
            const l = getLesson(pathId, slug);
            if (!l) return null;
            const path = paths.find((p) => p.id === l.path);
            return (
              <li key={slug}>
                <Link href={lessonUrl(l)}>
                  <span className="tag">{path?.title}</span>
                  <strong>{l.title}</strong>
                  <span className="muted">{l.minutes} min</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wrap section">
        <div className="band">
          <div>
            <span className="eyebrow">
              <Sparkles size={14} /> Learning with AI
            </span>
            <h2>Learn Python with AI — the right way</h2>
            <p>
              ChatGPT and Claude can write code, but you still need to read it, test it and fix it. PythonMates teaches
              you the understanding that makes AI useful instead of risky.
            </p>
            <ul>
              <li>PythonMate, an AI tutor for every lesson, is in development.</li>
              <li>The Python for AI path covers NumPy, pandas, LLM APIs, RAG and FastAPI.</li>
            </ul>
            <p style={{ marginTop: 16 }}>
              <Link href="/guides/learn-python-with-ai/" className="btn btn-sm">
                Read the guide: how to learn Python with AI <ArrowRight size={14} />
              </Link>
            </p>
          </div>
          <div className="card">
            <span className="card-icon">
              <Bot size={22} />
            </span>
            <h3>Using AI at work?</h3>
            <p>AIMates, our sister site, helps professionals use AI tools well in their everyday job.</p>
            <a className="card-meta" href={site.aimates} rel="noopener">
              Visit AIMates →
            </a>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <span className="kicker">FAQ</span>
          <h2>Questions people ask</h2>
        </div>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="card author">
          <span className="author-badge">SJ</span>
          <div>
            <h3>Written by {site.author.name}</h3>
            <p>
              {site.author.role}. Python developer for over 15 years in research, banking and tech.{" "}
              <Link href="/about/">About PythonMates →</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
