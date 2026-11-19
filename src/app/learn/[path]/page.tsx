import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import { getLesson, lessonUrl, publishedIn } from "@/content/lessons";
import { getPath, paths } from "@/content/paths";
import { breadcrumbLd, courseLd } from "@/lib/seo";

type Params = Promise<{ path: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return paths.map((p) => ({ path: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const path = getPath((await params).path);
  if (!path) return {};
  const title = `Python ${path.title} course — free lessons`;
  return {
    title,
    description: `${path.summary} Free, with runnable code, exercises and quizzes.`,
    alternates: { canonical: `/learn/${path.id}/` },
  };
}

export default async function PathPage({ params }: { params: Params }) {
  const path = getPath((await params).path);
  if (!path) notFound();
  const lessons = publishedIn(path.id);

  return (
    <>
      <JsonLd data={courseLd(path, lessons)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Learn", path: "/learn/" },
          { name: path.title, path: `/learn/${path.id}/` },
        ])}
      />
      <section className="page-head">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/learn/">Learn</Link> / <span>{path.title}</span>
          </div>
          <h1>Python {path.title}</h1>
          <p>{path.summary}</p>
          <p className="muted" style={{ fontSize: 15, marginTop: 12 }}>
            {path.outline.length} lessons · {lessons.length} published · new lessons added regularly
          </p>
        </div>
      </section>
      <section className="wrap section">
        <ol className="outline">
          {path.outline.map((o, i) => {
            const l = getLesson(path.id, o.slug);
            const inner = (
              <>
                <span className="num">{i + 1}</span>
                <span>
                  <span className="title">{o.title}</span>
                  {l && <span className="desc">{l.description}</span>}
                </span>
                <span className="right">{l ? `${l.minutes} min` : <span className="badge-soon">Soon</span>}</span>
              </>
            );
            return (
              <li key={o.slug}>
                {l ? <Link href={lessonUrl(l)}>{inner}</Link> : <div className="soon">{inner}</div>}
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
