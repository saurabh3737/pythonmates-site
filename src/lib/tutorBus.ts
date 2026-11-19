// Tiny event bus so any button on a lesson page can open PythonMate with a question.
export const TUTOR_EVENT = "pythonmate:ask";

export type TutorAsk = { prompt?: string };

export function askTutor(prompt?: string): void {
  window.dispatchEvent(new CustomEvent<TutorAsk>(TUTOR_EVENT, { detail: { prompt } }));
}

export const tutorPrompts = {
  explain: (code: string) => `Explain this code line by line:\n\`\`\`python\n${code}\n\`\`\``,
  error: (code: string, error: string) =>
    `I ran this code:\n\`\`\`python\n${code}\n\`\`\`\nand got this error:\n\`\`\`\n${error}\n\`\`\`\nWhat does it mean and where should I look? Please don't fix it for me.`,
  hint: (code: string, output: string) =>
    `I'm stuck on this lesson's exercise. My code:\n\`\`\`python\n${code}\n\`\`\`\nMy output:\n\`\`\`\n${output || "(no output)"}\n\`\`\`\nGive me one hint for the next step — not the solution.`,
};
