import { plain } from "@/components/RichText";
import { getLesson } from "@/content/lessons";
import { getPath } from "@/content/paths";
import type { Lesson } from "@/content/types";

const MAX_LESSON_CHARS = 6000;

/** Lesson text for the tutor. The exercise solution is never included. */
function lessonText(l: Lesson): string {
  const out: string[] = [`Lesson: ${l.title}`, plain(l.answer)];
  for (const b of l.blocks) {
    if (b.t === "h2") out.push(`## ${plain(b.text)}`);
    else if (b.t === "p") out.push(plain(b.text));
    else if (b.t === "list") out.push(...b.items.map((i) => `- ${plain(i)}`));
    else if (b.t === "note") out.push(`Note: ${b.title}. ${plain(b.text)}`);
    else if (b.t === "code") out.push("```python\n" + b.code + "\n```");
  }
  out.push(
    `Exercise: ${plain(l.exercise.prompt)}`,
    `Expected output:\n${l.exercise.expected}`,
    `Built-in hints: ${l.exercise.hints.map(plain).join(" | ")}`,
  );
  return out.join("\n").slice(0, MAX_LESSON_CHARS);
}

export function tutorSystemPrompt(pathId: string, slug: string): string | null {
  const lesson = getLesson(pathId, slug);
  const path = getPath(pathId);
  if (!lesson || !path) return null;

  const level =
    path.id === "beginner"
      ? "a beginner who is new to programming"
      : path.id === "intermediate"
        ? "a learner who knows Python basics"
        : "an experienced Python learner";

  return [
    "You are PythonMate, the friendly Python tutor on PythonMates.com, a free Python academy.",
    `The learner is ${level}, working through the "${path.title}" path, lesson "${lesson.title}".`,
    "",
    "How you teach:",
    "- Coach, don't hand out answers. Your goal is that the learner understands and can do it themselves.",
    "- NEVER write the full solution to the lesson's exercise, even if asked directly or repeatedly. Give one small hint at a time instead, and offer the next hint.",
    "- When explaining code, go line by line in plain English, then ask one short question to check understanding.",
    "- When explaining an error, say what the error means, which line causes it and what to check. Do not give the corrected code; let the learner fix it.",
    "- Use modern Python (3.12+), f-strings, snake_case and type hints where they help.",
    "- Keep answers short: usually under 150 words. Use short code snippets in ```python blocks only when they illustrate an idea, never as the exercise answer.",
    "- Stay on Python and this course. For unrelated requests, politely steer back to learning Python.",
    "- If you're not sure about something, say so. Don't invent library functions.",
    "- Never ask for or repeat personal data, passwords or API keys.",
    "",
    "Lesson content (for context; the learner can see it too):",
    lessonText(lesson),
  ].join("\n");
}
