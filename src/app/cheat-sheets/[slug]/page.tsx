import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import PrintButton from "@/components/PrintButton";
import RichText, { plain } from "@/components/RichText";
import { cheatsheets, getCheatsheet } from "@/content/cheatsheets";
import { getLesson } from "@/content/lessons";
import { highlightPython } from "@/lib/highlight";
import { authorLd, breadcrumbLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return cheatsheets.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const sheet = getCheatsheet((await params).slug);
  if (!sheet) return {};
  const url = `/cheat-sheets/${sheet.slug}/`;
  return {
    title: `${sheet.title} (free PDF)`,
    description: sheet.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: sheet.title, description: sheet.description, modifiedTime: sheet.updated },
  };
}

export default async function CheatSheetPage({ params }: { params: Params }) {
  const sheet = getCheatsheet((await params).slug);
  if (!sheet) notFound();
  const url = `/cheat-sheets/${sheet.slug}/`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["LearningResource", "TechArticle"],
          name: sheet.title,
          headline: sheet.title,
          description: sheet.description,
          abstract: plain(sheet.answer),
          url: `${site.url}${url}`,
          learningResourceType: "Cheat sheet",
          inLanguage: "en",
          isAccessibleForFree: true,
          dateModified: sheet.updated,
          author: authorLd,
          about: { "@type": "ComputerLanguage", name: "Python", version: site.pythonVersion },
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Cheat sheets", path: "/cheat-sheets/" },
          { name: sheet.title, path: url },
        ])}
      />
      <section className="page-head no-print-bg">
        <div className="wrap">
          <div className="crumbs no-print">
            <Link href="/cheat-sheets/">Cheat sheets</Link> / <span>{sheet.title}</span>
          </div>
          <h1>{sheet.title}</h1>
          <p>
            <RichText text={sheet.answer} />
          </p>
          <div className="row no-print">
            <PrintButton />
          </div>
        </div>
      </section>
      <div className="wrap section">
        <div className="sheet">
          {sheet.sections.map((sec) => (
            <section key={sec.title} className="sheet-section">
              <h2>{sec.title}</h2>
              <dl>
                {sec.items.map((it) => (
                  <div key={it.code}>
                    <dt>
                      <code dangerouslySetInnerHTML={{ __html: highlightPython(it.code) }} />
                    </dt>
                    <dd>{it.note}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <p className="sheet-foot">
          {site.name} · {site.url.replace("https://", "")}
          {url} · Python {site.pythonVersion} · updated {sheet.updated}
        </p>
        <div className="no-print">
          <h2 style={{ fontSize: 22, marginTop: 40 }}>Learn it properly</h2>
          <ul>
            {sheet.related.map((r) => {
              const [, , pathId, slug] = r.split("/");
              const lesson = getLesson(pathId, slug);
              return (
                <li key={r}>
                  <Link href={r}>{lesson?.title ?? r}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
