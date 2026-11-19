import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "performance",
  path: "advanced",
  title: "Performance and profiling",
  description:
    "Make Python code faster the right way: measure with timeit and cProfile, pick the right data structure, use built-ins and caching, avoid common slow patterns and know when to reach for NumPy.",
  minutes: 12,
  answer:
    "First measure, then optimise: use `timeit` for small snippets and `cProfile` to find which functions take the time. The biggest wins usually come from better data structures (a `set` instead of a `list` for lookups), built-in functions, caching repeated work and moving number crunching to NumPy — not from clever tricks.",
  blocks: [
    { t: "h2", text: "Measure with timeit" },
    {
      t: "code",
      run: true,
      code: 'import timeit\n\nloop = timeit.timeit("s = 0\\nfor i in range(1000): s += i", number=2000)\nbuiltin = timeit.timeit("sum(range(1000))", number=2000)\nprint(f"loop is {loop / builtin:.0f}x slower than sum()" if loop > builtin else "sum() was not faster")',
    },
    {
      t: "p",
      text: "Press Run to measure on your own device. Built-ins like `sum`, `min`, `max`, `sorted` and `\"\".join` run in C and are usually several times faster than an equivalent Python loop.",
    },
    { t: "h2", text: "The right data structure" },
    {
      t: "code",
      run: true,
      code: 'import timeit\n\nsetup = "items_list = list(range(100_000)); items_set = set(items_list)"\nin_list = timeit.timeit("99_999 in items_list", setup=setup, number=200)\nin_set = timeit.timeit("99_999 in items_set", setup=setup, number=200)\nprint(in_set < in_list)\nprint(f"set lookup about {in_list / in_set:,.0f}x faster")',
    },
    {
      t: "table",
      head: ["Task", "Slow", "Fast"],
      rows: [
        ["Is x in a big collection?", "`x in list`", "`x in set` or `dict`"],
        ["Add/remove at the front", "`list.insert(0, x)`", "`collections.deque`"],
        ["Count things", "nested loops", "`collections.Counter`"],
        ["Build a long string", "`s += part` in a loop", "`\"\".join(parts)`"],
        ["Find the top 3 of a million", "`sorted(x)[:3]`", "`heapq.nlargest(3, x)`"],
      ],
    },
    { t: "h2", text: "Cache repeated work" },
    {
      t: "code",
      run: true,
      code: 'from functools import cache\nimport time\n\n@cache\ndef exchange_rate(currency: str) -> float:\n    time.sleep(0.2)          # pretend slow lookup\n    return {"USD": 1.08, "INR": 90.1}[currency]\n\nprices = [exchange_rate("USD") * p for p in [10, 20, 30, 40]]\nprint([round(p, 2) for p in prices])\nprint(exchange_rate.cache_info().misses, "slow lookup")',
      output: "[10.8, 21.6, 32.4, 43.2]\n1 slow lookup",
    },
    { t: "h2", text: "Find the slow part with cProfile" },
    {
      t: "code",
      run: true,
      code: 'import cProfile\nimport pstats\n\ndef slow_unique(items):\n    seen = []\n    for x in items:\n        if x not in seen:       # list lookup: slow\n            seen.append(x)\n    return seen\n\ndef report():\n    data = list(range(3000)) * 2\n    return len(slow_unique(data))\n\nprofiler = cProfile.Profile()\nprofiler.enable()\nresult = report()\nprofiler.disable()\nprint(result)\nstats = pstats.Stats(profiler).sort_stats("cumulative")\ntop = [name for (_, _, name) in list(stats.stats)][:5]\nprint("slow_unique" in top)',
      output: "3000\nTrue",
    },
    {
      t: "code",
      file: "terminal",
      code: "$ python -m cProfile -s cumulative report.py | head -8",
    },
    {
      t: "p",
      text: "The profile shows how much time each function took, including the functions it calls. Fix the top entry first; changing anything else is guesswork.",
    },
    { t: "h2", text: "Vectorise number crunching" },
    {
      t: "code",
      run: true,
      code: "import numpy as np\n\nprices = np.array([12.5, 8.0, 30.0, 4.25])\nwith_vat = prices * 1.21\nprint(with_vat.round(2))\nprint(round(float(with_vat.sum()), 2))",
      output: "[15.12  9.68 36.3   5.14]\n66.25",
    },
    {
      t: "p",
      text: "NumPy applies one operation to a whole array in C, typically 10–100 times faster than a Python loop over the same numbers. The Python for AI path covers it in depth.",
    },
    {
      t: "note",
      tone: "tip",
      title: "Faster Python, for free",
      text: "Each new Python version gets faster: 3.11 was around 25% faster than 3.10 on average, and recent versions add an experimental JIT compiler and an optional free-threaded build. Simply upgrading is often the easiest speed-up.",
    },
  ],
  exercise: {
    prompt:
      "Speed up this de-duplication. Write `unique_in_order(items)` that keeps the first occurrence of each item in its original order, using a `set` to remember what you've seen. Print the result for `[3, 1, 3, 2, 1, 4]`, then the length of the result for `list(range(50_000)) * 2`.",
    starter: "def unique_in_order(items: list) -> list:\n    ...\n\n",
    expected: "[3, 1, 2, 4]\n50000",
    hints: [
      "Keep two things: a `seen` set and a `result` list.",
      "For each item: if it isn't in `seen`, add it to both.",
      "Bonus: `list(dict.fromkeys(items))` does the same in one line.",
    ],
    solution:
      "def unique_in_order(items: list) -> list:\n    seen = set()\n    result = []\n    for x in items:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    return result\n\nprint(unique_in_order([3, 1, 3, 2, 1, 4]))\nprint(len(unique_in_order(list(range(50_000)) * 2)))",
  },
  quiz: [
    {
      q: "What should you do before optimising?",
      options: ["Rewrite in C", "Measure to find the slow part", "Add more threads"],
      answer: 1,
      why: "Profiling tells you where time actually goes.",
    },
    {
      q: "Checking `x in collection` many times is fastest with...",
      options: ["A list", "A set", "A tuple"],
      answer: 1,
      why: "Sets use hashing, so lookups take about the same time at any size.",
    },
    {
      q: "Best way to join 10,000 strings?",
      options: ["`s += part` in a loop", "`\"\".join(parts)`", "f-strings in a loop"],
      answer: 1,
      why: "`join` builds the result in one go instead of creating a new string each time.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
