// A tiny Python highlighter: comments, strings, numbers, keywords and builtins.
// Returns escaped HTML. Good enough for teaching code, no dependency needed.

const KEYWORDS = new Set(
  "False None True and as assert async await break case class continue def del elif else except finally for from global if import in is lambda match nonlocal not or pass raise return try type while with yield".split(" "),
);
const BUILTINS = new Set(
  "abs all any bool dict enumerate filter float input int isinstance len list map max min open print range repr reversed round set sorted str sum super tuple zip self Exception ValueError TypeError KeyError IndexError ZeroDivisionError".split(" "),
);

const TOKEN =
  /(#[^\n]*)|([rRbBfFuU]{0,2}(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'))|(\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?\b)|([A-Za-z_]\w*)/g;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function highlightPython(code: string): string {
  let html = "";
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    html += esc(code.slice(last, i));
    const [text, com, str, num, word] = m;
    if (com) html += `<span class="tk-com">${esc(com)}</span>`;
    else if (str) html += `<span class="tk-str">${esc(str)}</span>`;
    else if (num) html += `<span class="tk-num">${esc(num)}</span>`;
    else if (word && KEYWORDS.has(word)) html += `<span class="tk-kw">${word}</span>`;
    else if (word && BUILTINS.has(word)) html += `<span class="tk-bi">${word}</span>`;
    else html += esc(text);
    last = i + text.length;
  }
  return html + esc(code.slice(last));
}

export function escapeHtml(s: string): string {
  return esc(s);
}
