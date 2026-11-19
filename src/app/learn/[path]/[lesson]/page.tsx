import { Bot, CheckCircle2, Clock, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ExerciseBox from "@/components/ExerciseBox";
import JsonLd from "@/components/JsonLd";
import LessonBody from "@/components/LessonBody";
import LessonSidebar from "@/components/LessonSidebar";
import Quiz from "@/components/Quiz";
import RichText from "@/components/RichText";
import { getLesson, lessonUrl, neighbours, publishedLessons } from "@/content/lessons";
import { getPath } from "@/content/paths";
import { breadcrumbLd, lessonLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = Promise<{ path: string; lesson: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedLessons().map((l) => ({ path: l.path, lesson: l.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { path, lesson: slug } = await params;
  const lesson = getLesson(path, slug);
  if (!lesson) return {};
  const url = lessonUrl(lesson);
  const title = `${lesson.title} — Python tutorial`;
  return {
    title,
    description: lesson.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: lesson.description, modifiedTime: lesson.updated },
  };
}

export default async function LessonPage({ params }: { params: Params }) {
  const { path: pathId, lesson: slug } = await params;
  const lesson = getLesson(pathId, slug);
  const path = getPath(pathId);
  if (!lesson || !path) notFound();

  const { prev, next } = neighbours(lesson);
  const index = path.outline.findIndex((o) => o.slug === lesson.slug) + 1;

  return (
    <div className="wrap lesson-layout">
      <LessonSidebar path={path} current={lesson.slug} />

      <article className="lesson">
        <JsonLd data={lessonLd(lesson, path)} />
        <JsonLd
          data={breadcrumbLd([
            { name: "Learn", path: "/learn/" },
            { name: path.title, path: `/learn/${path.id}/` },
            { name: lesson.title, path: lessonUrl(lesson) },
          ])}
        />

        <div className="crumbs">
          <Link href="/learn/">Learn</Link> / <Link href={`/learn/${path.id}/`}>{path.title}</Link> /{" "}
          <span>Lesson {index}</span>
        </div>
        <h1>{lesson.title}</h1>
        <div className="lesson-meta">
          <span>
            <Clock size={15} /> {lesson.minutes} min
          </span>
          <span>
            <CheckCircle2 size={15} /> Tested on Python {site.pythonVersion}
          </span>
          <span>Updated {lesson.updated}</span>
        </div>

        <div className="answer">
          <strong>In short</strong>
          <p>
            <RichText text={lesson.answer} />
          </p>
        </div>

        <LessonBody blocks={lesson.blocks} />

        {lesson.field && (
          <aside className="note field">
            <strong>{lesson.field.title}</strong>
            <p>
              <RichText text={lesson.field.text} />
            </p>
          </aside>
        )}

        <ExerciseBox exercise={lesson.exercise} />
        <Quiz questions={lesson.quiz} />

        {/* Slot for the Pythonmate AI tutor (phase 2). */}
        <div className="ai-slot">
          <div className="card">
            <span className="card-icon">
              <Bot size={22} />
            </span>
            <h3>Pythonmate — your AI tutor</h3>
            <p>Coming soon: ask questions about this lesson, get your code explained and receive extra exercises.</p>
            <span className="badge-soon" style={{ alignSelf: "flex-start" }}>
              In development
            </span>
          </div>
          <a className="card" href={site.aimates} rel="noopener">
            <span className="card-icon">
              <Sparkles size={22} />
            </span>
            <h3>Use AI at work</h3>
            <p>Python is the base of AI. On AIMates you learn to use AI tools well in your daily job.</p>
            <span className="card-meta">Visit AIMates →</span>
          </a>
        </div>

        <nav className="pager" aria-label="Lesson navigation">
          {prev && (
            <Link href={lessonUrl(prev)}>
              <small>← Previous</small>
              {prev.title}
            </Link>
          )}
          {next && (
            <Link href={lessonUrl(next)} className="next">
              <small>Next →</small>
              {next.title}
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
