import type { PathInfo } from "@/content/types";

// The full curriculum. Lessons that exist in src/content/lessons are published;
// the rest show as "coming soon" so learners see the whole journey.
export const paths: PathInfo[] = [
  {
    id: "beginner",
    title: "Beginner",
    level: "Start here",
    summary:
      "From zero to writing real programs: values, text, collections, decisions, loops, functions and files.",
    outline: [
      { slug: "what-is-python", title: "What is Python?" },
      { slug: "first-program", title: "Your first program" },
      { slug: "variables", title: "Variables" },
      { slug: "numbers", title: "Numbers" },
      { slug: "strings", title: "Strings" },
      { slug: "lists", title: "Lists" },
      { slug: "tuples-and-sets", title: "Tuples and sets" },
      { slug: "dictionaries", title: "Dictionaries" },
      { slug: "conditions", title: "Conditions" },
      { slug: "loops", title: "Loops" },
      { slug: "functions", title: "Functions" },
      { slug: "files-and-errors", title: "Files and errors" },
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    level: "Write clean Python",
    summary:
      "Write Python like a professional: comprehensions, classes, modules, generators, decorators, typing and tests.",
    outline: [
      { slug: "comprehensions", title: "Comprehensions" },
      { slug: "functional-tools", title: "Lambda, map, filter and reduce" },
      { slug: "classes", title: "Classes and objects" },
      { slug: "dataclasses", title: "Dataclasses" },
      { slug: "modules-and-packages", title: "Modules, packages and environments" },
      { slug: "iterators-and-generators", title: "Iterators and generators" },
      { slug: "decorators", title: "Decorators" },
      { slug: "type-hints", title: "Type hints" },
      { slug: "testing-with-pytest", title: "Testing with pytest" },
      { slug: "pygame-game", title: "Project: build a game with pygame" },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    level: "Fast and scalable",
    summary:
      "Concurrency, parallelism and performance: threads, processes, async/await, sockets and packaging.",
    outline: [
      { slug: "concurrency-vs-parallelism", title: "Concurrency vs parallelism" },
      { slug: "threads", title: "Threads" },
      { slug: "multiprocessing", title: "Multiprocessing" },
      { slug: "async-await", title: "async and await" },
      { slug: "sockets", title: "Sockets" },
      { slug: "performance", title: "Performance and profiling" },
      { slug: "packaging", title: "Packaging and publishing" },
      { slug: "speed-up-api-calls", title: "Project: speed up API calls" },
    ],
  },
  {
    id: "ai",
    title: "Python for AI",
    level: "Build with AI",
    summary:
      "The Python behind modern AI: NumPy, pandas, charts, machine learning, LLM APIs, RAG and AI apps.",
    outline: [
      { slug: "numpy", title: "NumPy" },
      { slug: "pandas", title: "pandas" },
      { slug: "matplotlib", title: "Charts with Matplotlib" },
      { slug: "scikit-learn", title: "Machine learning with scikit-learn" },
      { slug: "llm-apis", title: "Calling LLM APIs" },
      { slug: "rag-basics", title: "RAG basics" },
      { slug: "fastapi-for-ai", title: "AI apps with FastAPI" },
    ],
  },
];

export function getPath(id: string) {
  return paths.find((p) => p.id === id);
}

/** "Python Beginner", "Python Advanced", but "Python for AI" (no doubled word). */
export function pathName(p: { title: string }): string {
  return p.title.startsWith("Python") ? p.title : `Python ${p.title}`;
}
