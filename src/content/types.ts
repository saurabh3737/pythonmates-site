// Lesson content is plain data — no markdown parser, fully typed, easy to search,
// and easy for the future "Pythonmate" AI tutor to read.
// Inline `code` in any text is written with backticks.

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "list"; items: string[] }
  | { t: "code"; code: string; output?: string; file?: string; run?: boolean }
  | { t: "note"; tone: "tip" | "warn"; title: string; text: string }
  | { t: "table"; head: string[]; rows: string[][] };

export type Exercise = {
  prompt: string;
  starter: string;
  expected: string; // exact printed output the solution must produce
  hints: [string, string, string];
  solution: string;
};

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export type Lesson = {
  slug: string;
  path: PathId;
  title: string;
  description: string; // meta description, ~150 chars
  minutes: number;
  answer: string; // 2–3 sentence direct answer shown first (GEO)
  blocks: Block[];
  exercise: Exercise;
  quiz: QuizQuestion[];
  field?: { title: string; text: string };
  updated: string; // ISO date
};

export type PathId = "beginner" | "intermediate" | "advanced" | "ai";

export type PathInfo = {
  id: PathId;
  title: string;
  level: string;
  summary: string;
  outline: { slug: string; title: string }[];
};
