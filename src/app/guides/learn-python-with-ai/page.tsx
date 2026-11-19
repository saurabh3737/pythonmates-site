import { CheckCircle2, Clock, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import LessonBody from "@/components/LessonBody";
import RichText, { plain } from "@/components/RichText";
import type { Block } from "@/content/types";
import { authorLd, breadcrumbLd } from "@/lib/seo";
import { site } from "@/lib/site";

const url = "/guides/learn-python-with-ai/";
const title = "How to learn Python with AI (without letting it think for you)";
const description =
  "A practical guide to learning Python with ChatGPT, Claude and other AI assistants: the tutor mindset, prompts that teach instead of solve, checking AI code, and a 6-week plan.";
const updated = "2026-11-19";
const answer =
  "Use AI as a patient tutor, not as an answer machine. Ask it to explain, quiz you and give hints — never to write your exercise for you — and always run and test any code it produces. Pair it with a structured course, so you know what to learn next and can check your progress.";

const blocks: Block[] = [
  { t: "h2", text: "Why learn Python at all if AI can write it?" },
  {
    t: "p",
    text: "AI assistants write working code quickly, but they also write code that looks right and isn't: an off-by-one error, a missing edge case, a library call that doesn't exist. The person who can read the code, run it, test it and spot the problem is the one who gets the value. Learning Python is now less about typing syntax and more about understanding, checking and directing — which is exactly what you need to work well with AI.",
  },
  { t: "h2", text: "The tutor mindset: five rules" },
  {
    t: "list",
    items: [
      "Write first, ask second. Try every exercise yourself before asking AI anything.",
      "Ask for hints, not solutions. A hint keeps the learning in your head; a solution keeps it in the chat.",
      "Make it explain, then explain it back. If you can't explain the code in your own words, you haven't learned it yet.",
      "Run everything. Never trust code you haven't run — paste it into a PythonMates code block or your editor.",
      "Keep a list of mistakes. The errors you make are your personal curriculum; ask AI to quiz you on them weekly.",
    ],
  },
  { t: "h2", text: "Prompts that teach instead of solve" },
  {
    t: "table",
    head: ["When you...", "Ask the AI this"],
    rows: [
      ["are stuck on an exercise", "\"Don't give me the solution. Give me one hint about what to look at next.\""],
      ["don't understand some code", "\"Explain this code line by line for a beginner. Then ask me two questions to check I understood.\""],
      ["get an error", "\"Explain this error message in plain English and tell me where to look. Don't fix the code for me.\""],
      ["finished a lesson", "\"Quiz me with five short questions on Python dictionaries, one at a time, and tell me what I got wrong.\""],
      ["want more practice", "\"Give me three exercises like this one, slightly harder each time, without solutions.\""],
      ["wrote working code", "\"Review my code like a senior Python developer. What would you change and why?\""],
    ],
  },
  {
    t: "note",
    tone: "tip",
    title: "Tell it your level",
    text: "Start conversations with context: \"I'm learning Python, I know variables and loops but not functions yet.\" The answers get dramatically better when the AI knows what you already know.",
  },
  { t: "h2", text: "How to check AI-written code" },
  {
    t: "code",
    run: true,
    code: 'def average(numbers):\n    # an AI-written function that "looks right"\n    return sum(numbers) / len(numbers)\n\n# test the normal case AND the edge cases\nprint(average([2, 4, 6]))\ntry:\n    print(average([]))\nexcept ZeroDivisionError:\n    print("Bug found: empty list crashes")',
    output: "4.0\nBug found: empty list crashes",
  },
  {
    t: "list",
    items: [
      "Run it with normal input, then with edge cases: empty lists, zero, negative numbers, missing keys, very large input.",
      "Read every line. If a line uses something you've never seen, look it up or ask what it does.",
      "Check that libraries and functions actually exist — AI sometimes invents plausible-sounding ones.",
      "Write two or three `assert` checks or a small pytest test before you rely on it (see Testing with pytest).",
    ],
  },
  { t: "h2", text: "What AI is great at — and where to be careful" },
  {
    t: "table",
    head: ["Great for", "Be careful with"],
    rows: [
      ["Explaining concepts in different ways", "Accepting code you don't understand"],
      ["Translating error messages", "Very new library versions it may not know"],
      ["Generating practice exercises", "Security: never paste passwords, API keys or private data"],
      ["Reviewing your code and suggesting improvements", "Letting it choose your learning path at random"],
      ["Boilerplate once you understand it", "Copying solutions to exercises you're meant to solve"],
    ],
  },
  { t: "h2", text: "A 6-week plan with PythonMates and AI" },
  {
    t: "table",
    head: ["Week", "PythonMates", "Use AI to..."],
    rows: [
      ["1", "Beginner 1–4: what Python is, first program, variables, numbers", "Explain anything unclear in a second way"],
      ["2", "Beginner 5–8: strings, lists, tuples and sets, dictionaries", "Quiz you on the lessons at the end of the week"],
      ["3", "Beginner 9–12: conditions, loops, functions, files and errors", "Give hints on exercises — never solutions"],
      ["4", "Intermediate 1–5: comprehensions to modules and environments", "Review your solutions like a senior developer"],
      ["5", "Intermediate 6–10: generators, decorators, type hints, tests, the game project", "Explain errors while you build the game"],
      ["6", "Python for AI 1–5: NumPy, pandas, charts, scikit-learn, LLM APIs", "Help you plan a small project of your own"],
    ],
  },
  {
    t: "p",
    text: "Twenty to thirty minutes a day is enough. Consistency beats long weekend sessions, and the daily quiz and exercise keep what you learn from fading.",
  },
  { t: "h2", text: "Your first session, today" },
  {
    t: "list",
    items: [
      "Open the first lesson, What is Python?, and press Run on every example.",
      "Do the exercise yourself. If you're stuck, use the built-in hints before asking an AI.",
      "Ask your AI assistant: \"Quiz me with three questions about what Python is used for.\"",
      "Write down one thing that surprised you. That's your first entry in your mistakes-and-surprises list.",
    ],
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  authors: [{ name: site.author.name, url: site.author.url }],
  openGraph: { type: "article", url, title, description, publishedTime: updated, modifiedTime: updated, authors: [site.author.url] },
  twitter: { card: "summary_large_image", title, description },
};

export default function LearnWithAiGuide() {
  return (
    <div className="wrap" style={{ paddingTop: 32 }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          abstract: plain(answer),
          url: `${site.url}${url}`,
          mainEntityOfPage: `${site.url}${url}`,
          datePublished: updated,
          dateModified: updated,
          inLanguage: "en",
          author: authorLd,
          publisher: { "@type": "EducationalOrganization", name: site.name, url: site.url },
          about: ["Python", "Learning with AI", "ChatGPT", "Claude"],
        }}
      />
      <JsonLd data={breadcrumbLd([{ name: "Learn Python with AI", path: url }])} />
      <article className="lesson" style={{ margin: "0 auto" }}>
        <div className="crumbs">
          <Link href="/">Home</Link> / <span>Guide</span>
        </div>
        <h1>{title}</h1>
        <div className="lesson-meta">
          <span>
            <Clock size={15} /> 9 min read
          </span>
          <span>
            <CheckCircle2 size={15} /> Updated <time dateTime={updated}>{updated}</time>
          </span>
          <span>
            <UserRound size={15} /> By{" "}
            <Link href="/about/" rel="author">
              {site.author.name}
            </Link>
          </span>
        </div>
        <div className="answer">
          <strong>In short</strong>
          <p>
            <RichText text={answer} />
          </p>
        </div>
        <LessonBody blocks={blocks} />
        <div className="row" style={{ marginTop: 32 }}>
          <Link href="/learn/beginner/what-is-python/" className="btn btn-primary">
            Start the first lesson
          </Link>
          <Link href="/cheat-sheets/" className="btn">
            Get the cheat sheets
          </Link>
        </div>
      </article>
    </div>
  );
}
