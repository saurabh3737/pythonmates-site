import { Fragment } from "react";

/** Renders text where `backticks` mark inline code. */
export default function RichText({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <code key={i}>{part}</code> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

/** Plain-text version (backticks removed) for meta tags and JSON-LD. */
export function plain(text: string): string {
  return text.replace(/`/g, "");
}
