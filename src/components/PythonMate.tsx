"use client";

import { Bot, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/Brand";
import TutorText from "@/components/TutorText";
import { TUTOR_EVENT, type TutorAsk } from "@/lib/tutorBus";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Explain the main idea of this lesson in simple words",
  "Give me one extra practice question (no solution)",
  "What mistakes do people often make with this?",
];

const errors: Record<string, string> = {
  not_configured: "PythonMate isn't switched on yet. Please check back soon!",
  rate_limited: "You've asked a lot in a short time. Take a short break and try again in a few minutes.",
};

export default function PythonMate({ path, slug, title }: { path: string; slug: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const messagesRef = useRef<Msg[]>([]);

  async function send(text: string) {
    const prompt = text.trim();
    if (!prompt || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setInput("");
    const history: Msg[] = [...messagesRef.current, { role: "user", content: prompt }];
    setMessages([...history, { role: "assistant", content: "" }]);

    const update = (content: string) =>
      setMessages((m) => [...m.slice(0, -1), { role: "assistant", content }]);

    try {
      const res = await fetch("/api/pythonmate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, slug, messages: history.filter((m) => m.content) }),
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        update(errors[data.error ?? ""] ?? "PythonMate couldn't answer right now. Please try again in a moment.");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        update(answer);
      }
      if (!answer.trim()) update("PythonMate couldn't answer right now. Please try again in a moment.");
    } catch {
      update("Connection problem — please check your internet and try again.");
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  useEffect(() => {
    function onAsk(e: Event) {
      const { prompt } = (e as CustomEvent<TutorAsk>).detail ?? {};
      setOpen(true);
      if (prompt) void send(prompt);
    }
    window.addEventListener(TUTOR_EVENT, onAsk);
    return () => window.removeEventListener(TUTOR_EVENT, onAsk);
    // send only uses refs and stable values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {!open && (
        <button type="button" className="tm-fab" onClick={() => setOpen(true)} aria-label="Ask PythonMate, your AI tutor">
          <Bot size={20} /> <span>Ask PythonMate</span>
        </button>
      )}
      {open && (
        <aside className="tm-panel" role="dialog" aria-label="PythonMate AI tutor">
          <header className="tm-head">
            <BrandMark className="tm-mark" />
            <div>
              <strong>PythonMate</strong>
              <span>AI tutor · {title}</span>
            </div>
            <button type="button" className="tm-close" onClick={() => setOpen(false)} aria-label="Close PythonMate">
              <X size={18} />
            </button>
          </header>

          <div className="tm-list" ref={listRef} aria-live="polite">
            {messages.length === 0 && (
              <div className="tm-welcome">
                <p>
                  Hi! I&apos;m <strong>PythonMate</strong>. I know this lesson and I&apos;ll help you understand it —
                  with explanations and hints, not ready-made answers.
                </p>
                <p className="tm-tip">
                  Tip: use the <Sparkles size={13} /> Explain button on any code block, or ask me for a hint when the
                  exercise doesn&apos;t pass.
                </p>
                <div className="tm-suggest">
                  {suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`tm-msg ${m.role}`}>
                {m.role === "assistant" ? (
                  m.content ? (
                    <TutorText text={m.content} />
                  ) : (
                    <span className="tm-typing" aria-label="PythonMate is thinking">
                      <i />
                      <i />
                      <i />
                    </span>
                  )
                ) : (
                  <TutorText text={m.content} />
                )}
              </div>
            ))}
          </div>

          <form
            className="tm-form"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Ask about this lesson…"
              rows={2}
              maxLength={2000}
              aria-label="Your question"
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy || !input.trim()} aria-label="Send">
              <Send size={15} />
            </button>
          </form>
          <p className="tm-note">Answers by Google Gemini and can be wrong — run the code to check. Don&apos;t share personal data. Nothing is stored.</p>
        </aside>
      )}
    </>
  );
}
