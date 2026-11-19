// Shared layout for social share images (rendered by next/og at build/request time).
// The logo is the same SVG as src/app/icon.svg, inlined as a data URI.
export const ogSize = { width: 1200, height: 630 };

export function OgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "linear-gradient(135deg, #0b1220 0%, #12264a 60%, #1d4f86 100%)",
        color: "#e8eef9",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNGM5N2YwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMmI1ZjlhIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InkiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmUzNmIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmNWI0MDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjE5LjUiIGhlaWdodD0iMTkuNSIgcng9IjUuNSIgZmlsbD0idXJsKCNiKSIvPjxyZWN0IHg9IjExIiB5PSIxMSIgd2lkdGg9IjE5LjUiIGhlaWdodD0iMTkuNSIgcng9IjUuNSIgZmlsbD0idXJsKCN5KSIvPjxwYXRoIGQ9Ik02LjYgMTYuMlY2LjZoMy45YTMuMSAzLjEgMCAwIDEgMCA2LjJINi42IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTYuNCAyNS42di04LjRsNC4zNSA1LjQgNC4zNS01LjR2OC40IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTI4NGEiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=" width={76} height={76} alt="" />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
          <span>Python</span>
          <span style={{ color: "#ffd43b" }}>Mates</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", fontSize: 28, color: "#ffd43b", textTransform: "uppercase", letterSpacing: 2 }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 76, fontWeight: 800, lineHeight: 1.1 }}>
          {title}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#9fb0cc" }}>{footer}</div>
    </div>
  );
}
