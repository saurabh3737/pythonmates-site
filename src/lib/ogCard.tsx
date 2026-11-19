// Shared layout for social share images (rendered by next/og at build/request time).
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
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "#3776ab",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffd43b",
            fontSize: 40,
            fontWeight: 800,
          }}
        >
          {">_"}
        </div>
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
