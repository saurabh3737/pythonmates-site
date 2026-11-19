import { ArrowRight, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import { cheatsheets } from "@/content/cheatsheets";
import { breadcrumbLd, itemListLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Python cheat sheets — free, printable PDF",
  description:
    "Free printable Python cheat sheets: Python basics, pandas and Python for AI. One page each, modern Python 3 syntax, save as PDF.",
  alternates: { canonical: "/cheat-sheets/" },
};

export default function CheatSheetsPage() {
  return (
    <>
      <JsonLd
        data={itemListLd(
          "Python cheat sheets",
          cheatsheets.map((c) => ({ name: c.title, path: `/cheat-sheets/${c.slug}/` })),
        )}
      />
      <JsonLd data={breadcrumbLd([{ name: "Cheat sheets", path: "/cheat-sheets/" }])} />
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Cheat sheets</span>
          <h1>Python cheat sheets</h1>
          <p>One page each, written for modern Python. Keep them open while you code, or print them as a PDF.</p>
        </div>
      </section>
      <section className="wrap section">
        <div className="cards">
          {cheatsheets.map((c) => (
            <Link key={c.slug} href={`/cheat-sheets/${c.slug}/`} className="card">
              <span className="card-icon">
                <FileText size={22} />
              </span>
              <h3>{c.title.replace(" cheat sheet", "")}</h3>
              <p>{c.description}</p>
              <span className="card-meta">
                Open cheat sheet <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
