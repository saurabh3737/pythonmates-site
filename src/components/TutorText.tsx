import { Fragment } from "react";

import { highlightPython } from "@/lib/highlight";

// Renders the small subset of Markdown PythonMate uses: ```code``` blocks,
// `inline code`, **bold**, bullet and numbered lists, and paragraphs.

function inline(text: string, key: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={`${key}-${i}`}>{part}</code>
    ) : (
      <Fragment key={`${key}-${i}`}>
        {part.split("**").map((p, j) => (j % 2 === 1 ? <strong key={j}>{p}</strong> : <Fragment key={j}>{p}</Fragment>))}
      </Fragment>
    ),
  );
}

function prose(text: string, key: string) {
  return text
    .split(/\n{2,}/)
    .filter((b) => b.trim())
    .map((block, bi) => {
      const lines = block.split("\n").filter((l) => l.trim());
      const bullets = lines.every((l) => /^\s*([-*]|\d+[.)])\s+/.test(l));
      if (bullets) {
        const ordered = /^\s*\d+[.)]/.test(lines[0]);
        const items = lines.map((l, li) => <li key={li}>{inline(l.replace(/^\s*([-*]|\d+[.)])\s+/, ""), `${key}-${bi}-${li}`)}</li>);
        return ordered ? <ol key={bi}>{items}</ol> : <ul key={bi}>{items}</ul>;
      }
      return (
        <p key={bi}>
          {lines.map((l, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {inline(l, `${key}-${bi}-${li}`)}
            </Fragment>
          ))}
        </p>
      );
    });
}

export default function TutorText({ text }: { text: string }) {
  // While streaming, a code block may not be closed yet.
  const safe = (text.match(/```/g)?.length ?? 0) % 2 === 1 ? `${text}\n\`\`\`` : text;
  const parts = safe.split(/```[a-zA-Z]*\n?([\s\S]*?)```/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <pre key={i} className="tm-code">
            <code dangerouslySetInnerHTML={{ __html: highlightPython(part.replace(/\n$/, "")) }} />
          </pre>
        ) : (
          <Fragment key={i}>{prose(part, String(i))}</Fragment>
        ),
      )}
    </>
  );
}
