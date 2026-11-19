# pythonmates.com

Free, modern Python academy: short lessons, code that runs in the browser
(Pyodide), exercises with hints, quizzes, and four learning paths from
Beginner to Python for AI.

Stack: Next.js 16 (App Router), React 19, TypeScript, plain CSS. Hosted on Vercel.

## Run locally

    npm install
    npm run dev

Open http://localhost:3000.

## Where things live

- `src/content/paths.ts` — the full curriculum (all planned lessons).
- `src/content/lessons/<path>/<slug>.ts` — one file per lesson (typed data).
- `src/content/lessons/index.ts` — register each new lesson here.
  Lessons that aren't registered show as "soon".
- `src/lib/pyRunner.ts` — Pyodide in a Web Worker, 10-second limit per run.
- `src/app/llms.txt/route.ts` — site map for AI assistants.
- `next.config.ts` — 301 redirects from the old Sphinx pages.
- `legacy/` — the old Sphinx site, kept for reference only (not deployed).

## Adding a lesson

1. Copy an existing lesson file and change the content.
2. Put inline code in backticks. Give every runnable example its real `output`.
3. Run every example and the exercise solution with Python and check the
   output matches exactly.
4. Import it in `src/content/lessons/index.ts`.

## Deploy

Vercel project settings → Build and Deployment:
Framework Preset **Next.js**, no overrides for build command or output directory.

Old URLs: saurabhjaiswal.com/pythonmates/x.html → pythonmates.com/x.html →
new lesson URL (both 301).
