import CodeBlock from "@/components/CodeBlock";
import RichText from "@/components/RichText";
import type { Block } from "@/content/types";

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function LessonBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2 key={i} id={slugify(b.text)}>
                <RichText text={b.text} />
              </h2>
            );
          case "p":
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <RichText text={it} />
                  </li>
                ))}
              </ul>
            );
          case "code":
            return <CodeBlock key={i} code={b.code} output={b.output} file={b.file} run={b.run} />;
          case "note":
            return (
              <aside key={i} className={`note ${b.tone}`}>
                <strong>{b.title}</strong>
                <p>
                  <RichText text={b.text} />
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k}>
                            <RichText text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
