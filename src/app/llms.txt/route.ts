import { plain } from "@/components/RichText";
import { cheatsheets } from "@/content/cheatsheets";
import { getLesson, lessonUrl } from "@/content/lessons";
import { paths } from "@/content/paths";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt: a plain map of the site for AI assistants (https://llmstxt.org).
export function GET() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Lessons are tested on Python ${site.pythonVersion}. Each lesson opens with a short direct answer, then examples with their real output, an exercise with hints and a quiz. Author: ${site.author.name} (${site.author.url}).`,
    "",
  ];
  for (const p of paths) {
    const live = p.outline.map((o) => getLesson(p.id, o.slug)).filter((l) => !!l);
    if (!live.length) continue;
    lines.push(`## ${p.title}: ${p.summary}`, "");
    for (const l of live) {
      lines.push(`- [${l.title}](${site.url}${lessonUrl(l)}): ${plain(l.answer)}`);
    }
    lines.push("");
  }
  lines.push(
    "## Optional",
    "",
    `- [How to learn Python with AI](${site.url}/guides/learn-python-with-ai/): prompts that teach instead of solve, checking AI code, a 6-week plan`,
    ...cheatsheets.map((c) => `- [${c.title}](${site.url}/cheat-sheets/${c.slug}/): ${c.description}`),
    `- [Full course text](${site.url}/llms-full.txt): every lesson in one plain-text file`,
    `- [Practice exercises](${site.url}/practice/): all exercises with automatic checking`,
    `- [About](${site.url}/about/)`,
    `- [AIMates](https://aimates.org/): sister site on using AI at work`,
    "",
  );
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
