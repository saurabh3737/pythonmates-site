import { ArrowRight, Bot, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

import CodeBlock from "@/components/CodeBlock";
import JsonLd from "@/components/JsonLd";
import { pathIcons } from "@/components/pathIcons";
import { publishedIn, publishedLessons } from "@/content/lessons";
import { paths } from "@/content/paths";
import { websiteLd } from "@/lib/seo";
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

export default function Home() {
  const lessonCount = publishedLessons().length;

  return (
    <>
      <JsonLd data={websiteLd()} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Free · Python {site.pythonVersion} · runs in your browser</span>
            <h1>
              Learn Python the <span>modern way</span>
            </h1>
            <p className="hero-lead">
              Short lessons, code you can run and change right on the page, exercises with hints and quizzes — from
              your very first line to Python for AI.
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
                <CheckCircle2 size={16} /> {lessonCount} free lessons
              </span>
            </div>
          </div>
          <div>
            <CodeBlock code={demo} output={demoOutput} file="Try it — press Run" run />
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Four paths, one journey</h2>
          <p>Start where you are. Every path builds on the one before, ending with the Python you need for AI work.</p>
        </div>
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

      <section className="wrap section">
        <div className="section-head">
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
        <div className="band">
          <div>
            <span className="eyebrow">
              <Sparkles size={14} /> Learning with AI
            </span>
            <h2>Learn Python with AI — the right way</h2>
            <p>
              ChatGPT and Claude can write code, but you still need to read it, test it and fix it. Pythonmates teaches
              you the understanding that makes AI useful instead of risky.
            </p>
            <ul>
              <li>Pythonmate, an AI tutor for every lesson, is in development.</li>
              <li>The Python for AI path covers NumPy, pandas, LLM APIs, RAG and FastAPI.</li>
            </ul>
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
        <div className="card author">
          <span className="author-badge">SJ</span>
          <div>
            <h3>Written by {site.author.name}</h3>
            <p>
              {site.author.role}. Python developer for over 15 years in research, banking and tech. {lessonCount}{" "}
              free lessons from your first line of code to Python for AI.{" "}
              <Link href="/about/">About Pythonmates →</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
