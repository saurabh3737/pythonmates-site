import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap not-found">
      <h1>Page not found</h1>
      <p className="muted">This page doesn&apos;t exist — or the lesson isn&apos;t published yet.</p>
      <p style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
        <Link href="/learn/" className="btn btn-primary">
          Browse lessons
        </Link>
        <Link href="/" className="btn">
          Home
        </Link>
      </p>
    </section>
  );
}
