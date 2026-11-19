import { plain } from "@/components/RichText";
import { cheatsheets } from "@/content/cheatsheets";
import { getLesson, lessonUrl } from "@/content/lessons";
import { paths } from "@/content/paths";
import type { Lesson } from "@/content/types";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function lessonText(l: Lesson): string {
  const out: string[] = [`### ${l.title}`, "", `URL: ${site.url}${lessonUrl(l)}`, `Updated: ${l.updated}`, "", plain(l.answer), ""];
  for (const b of l.blocks) {
    if (b.t === "h2") out.push(`#### ${plain(b.text)}`, "");
    else if (b.t === "p") out.push(plain(b.text), "");
    else if (b.t === "list") out.push(...b.items.map((i) => `- ${plain(i)}`), "");
    else if (b.t === "note") out.push(`Note — ${b.title}: ${plain(b.text)}`, "");
    else if (b.t === "table") out.push(b.head.join(" | "), ...b.rows.map((r) => plain(r.join(" | "))), "");
    else if (b.t === "code") {
      out.push("```" + (b.file === "terminal" ? "bash" : "python"), b.code, "```");
      if (b.output) out.push("Output:", "```", b.output, "```");
      out.push("");
    }
  }
  return out.join("\n");
}

// Full text of every lesson, for AI assistants that want the whole course in one file.
export function GET() {
  const parts: string[] = [
    `# ${site.name} — full course text`,
    "",
    `> ${site.description}`,
    "",
    `Author: ${site.author.name} (${site.author.url}). Lessons tested on Python ${site.pythonVersion}. Index: ${site.url}/llms.txt`,
    "",
  ];
  for (const p of paths) {
    const live = p.outline.map((o) => getLesson(p.id, o.slug)).filter((l): l is Lesson => !!l);
    if (!live.length) continue;
    parts.push(`## ${p.title} path`, "", p.summary, "");
    for (const l of live) parts.push(lessonText(l));
  }
  parts.push("## Cheat sheets", "");
  for (const c of cheatsheets) {
    parts.push(`### ${c.title}`, "", `URL: ${site.url}/cheat-sheets/${c.slug}/`, "", plain(c.answer), "");
    for (const sec of c.sections) {
      parts.push(`#### ${sec.title}`, "", ...sec.items.map((i) => `- \`${i.code.replace(/\n/g, " ⏎ ")}\` — ${i.note}`), "");
    }
  }
  return new Response(parts.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
