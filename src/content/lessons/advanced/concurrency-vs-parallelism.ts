import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "concurrency-vs-parallelism",
  path: "advanced",
  title: "Concurrency vs parallelism",
  description:
    "Concurrency and parallelism in Python explained with a cooking example: CPU, cores, processes and threads, I/O-bound vs CPU-bound work, the GIL, free-threaded Python and which tool to choose.",
  minutes: 11,
  answer:
    "Concurrency means juggling several tasks so that waiting time is used for other work; parallelism means doing several things at literally the same moment on different CPU cores. In Python, use threads or `asyncio` for I/O-bound work (waiting on networks and files) and multiple processes for CPU-bound work (heavy calculations).",
  blocks: [
    { t: "h2", text: "A cooking example" },
    {
      t: "p",
      text: "Ten friends are coming for lunch and you have to wash vegetables, cut them, cook the curry and boil rice. Doing every step one after another is sequential. Putting the rice on to boil and cutting vegetables while it cooks is concurrency: one cook, but no idle waiting. Asking a friend to cook the curry on a second stove while you make the rice is parallelism: two cooks working at the same moment.",
    },
    {
      t: "table",
      head: ["Approach", "Kitchen", "Computer"],
      rows: [
        ["Sequential", "One cook, one step at a time", "One task finishes before the next starts"],
        ["Concurrent", "One cook, switches while rice boils", "Threads or `asyncio` switch while waiting"],
        ["Parallel", "Several cooks, several stoves", "Several processes on several CPU cores"],
      ],
    },
    { t: "h2", text: "CPU, cores, processes and threads" },
    {
      t: "list",
      items: [
        "A CPU has several cores; each core can run one thing at a time.",
        "A process is a running program with its own memory. Every Python process has its own interpreter.",
        "A thread is a line of work inside a process. Threads share the process's memory, which makes them light but means they can step on each other's data.",
      ],
    },
    {
      t: "code",
      run: true,
      code: 'import os\nimport threading\n\nprint("CPU cores reported:", os.cpu_count() is not None)\nprint("Current thread:", threading.current_thread().name)',
      output: "CPU cores reported: True\nCurrent thread: MainThread",
    },
    { t: "h2", text: "I/O-bound vs CPU-bound" },
    {
      t: "table",
      head: ["Kind of work", "What the program waits for", "Examples", "Use"],
      rows: [
        ["I/O-bound", "Network, disk, databases", "Calling APIs, downloading files, querying a database", "Threads or `asyncio`"],
        ["CPU-bound", "Nothing — the CPU is busy", "Image processing, number crunching, parsing huge files", "Processes"],
      ],
    },
    {
      t: "code",
      run: true,
      code: 'import time\n\ndef io_task():\n    time.sleep(0.2)          # waiting: the CPU is idle\n\ndef cpu_task():\n    return sum(i * i for i in range(300_000))   # CPU is busy\n\nfor task in (io_task, cpu_task):\n    task()\n    print(task.__name__, "done")',
      output: "io_task done\ncpu_task done",
    },
    { t: "h2", text: "The GIL" },
    {
      t: "p",
      text: "The standard Python interpreter (CPython) has a Global Interpreter Lock: only one thread runs Python code at any moment. Threads still help with I/O because a thread releases the GIL while it waits, but they don't speed up pure Python calculations. Separate processes each have their own GIL, so they do run in parallel.",
    },
    {
      t: "note",
      tone: "tip",
      title: "Free-threaded Python",
      text: "Since Python 3.13 there is an optional free-threaded build without the GIL, officially supported since 3.14. It lets threads run Python code in parallel, but many libraries are still catching up, so processes remain the safe default for CPU-heavy work.",
    },
    { t: "h2", text: "Choosing a tool" },
    {
      t: "table",
      head: ["Situation", "Tool", "Lesson"],
      rows: [
        ["A few dozen API calls or downloads", "`ThreadPoolExecutor`", "Threads"],
        ["Thousands of network connections", "`asyncio`", "async and await"],
        ["Heavy calculations on many items", "`ProcessPoolExecutor`", "Multiprocessing"],
        ["Numbers in arrays", "NumPy (already uses fast C code)", "NumPy for AI"],
      ],
    },
  ],
  exercise: {
    prompt:
      "Write `best_tool(task: str) -> str` that returns `\"threads\"` for `\"download\"` and `\"api call\"`, `\"processes\"` for `\"resize images\"` and `\"train model\"`, and `\"sequential\"` for anything else. Print the result for each of: `download`, `train model`, `add two numbers`.",
    starter: "def best_tool(task: str) -> str:\n    ...\n\n",
    expected: "threads\nprocesses\nsequential",
    hints: [
      "Group the I/O tasks and the CPU tasks in two sets.",
      'if task in {"download", "api call"}: return "threads"',
      'Add an elif for the CPU set and return "sequential" at the end.',
    ],
    solution:
      'def best_tool(task: str) -> str:\n    if task in {"download", "api call"}:\n        return "threads"\n    if task in {"resize images", "train model"}:\n        return "processes"\n    return "sequential"\n\nfor t in ["download", "train model", "add two numbers"]:\n    print(best_tool(t))',
  },
  quiz: [
    {
      q: "Calling 50 web APIs is mostly...",
      options: ["CPU-bound", "I/O-bound", "Neither"],
      answer: 1,
      why: "Most of the time is spent waiting for the network.",
    },
    {
      q: "Why don't threads speed up pure Python number crunching in standard CPython?",
      options: ["Threads are always slower", "The GIL lets only one thread run Python code at a time", "Python has no threads"],
      answer: 1,
      why: "Use processes (or the free-threaded build) for CPU-bound Python code.",
    },
    {
      q: "Parallelism means...",
      options: ["Switching between tasks while waiting", "Running tasks at the same moment on different cores", "Running tasks one after another"],
      answer: 1,
      why: "Concurrency is about structure; parallelism is about simultaneous execution.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
