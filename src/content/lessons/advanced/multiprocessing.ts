import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "multiprocessing",
  path: "advanced",
  title: "Multiprocessing",
  description:
    "Use all CPU cores in Python with ProcessPoolExecutor and multiprocessing: parallel map, chunksize, the __main__ guard, sharing results and when processes are worth it.",
  minutes: 12,
  answer:
    "Multiprocessing runs work in several separate Python processes, each with its own interpreter and GIL, so CPU-heavy code really runs in parallel on several cores. Use `concurrent.futures.ProcessPoolExecutor` with `map`, keep the work in top-level functions, and always start pools under `if __name__ == \"__main__\":`.",
  blocks: [
    {
      t: "note",
      tone: "tip",
      title: "Run these on your computer",
      text: "Browsers can't start extra processes, so these examples are marked \"run on your computer\". Timings depend on your machine.",
    },
    { t: "h2", text: "A CPU-heavy task" },
    {
      t: "code",
      run: true,
      code: "def count_primes(limit: int) -> int:\n    count = 0\n    for n in range(2, limit):\n        if all(n % d for d in range(2, int(n ** 0.5) + 1)):\n            count += 1\n    return count\n\nprint(count_primes(10_000))",
      output: "1229",
    },
    { t: "h2", text: "Running it on all cores" },
    {
      t: "code",
      file: "primes.py · run on your computer",
      code: 'import time\nfrom concurrent.futures import ProcessPoolExecutor\n\n\ndef count_primes(limit: int) -> int:\n    count = 0\n    for n in range(2, limit):\n        if all(n % d for d in range(2, int(n ** 0.5) + 1)):\n            count += 1\n    return count\n\n\nif __name__ == "__main__":\n    limits = [200_000] * 4\n\n    start = time.perf_counter()\n    serial = [count_primes(x) for x in limits]\n    print(f"one process:   {time.perf_counter() - start:.1f}s")\n\n    start = time.perf_counter()\n    with ProcessPoolExecutor() as pool:\n        parallel = list(pool.map(count_primes, limits))\n    print(f"process pool:  {time.perf_counter() - start:.1f}s")\n\n    print(serial == parallel, parallel[0])',
      output: "one process:   1.2s\nprocess pool:  0.6s\nTrue 17984",
    },
    {
      t: "p",
      text: "This output comes from a 2-core machine, so the pool takes half the time. With 8 cores, expect it to be close to 8 times faster. The pattern holds for any heavy pure-Python function.",
    },
    { t: "h2", text: "Rules that avoid headaches" },
    {
      t: "list",
      items: [
        "Always create the pool under `if __name__ == \"__main__\":`. On Windows and macOS each worker re-imports your file, and without the guard it would start pools endlessly.",
        "The function must be defined at the top level of a module, not inside another function or as a lambda — workers need to import it.",
        "Arguments and results are copied between processes (pickled). Send small inputs, return small results; don't pass huge objects back and forth.",
        "Processes don't share variables. Return values instead of changing globals.",
      ],
    },
    { t: "h2", text: "Many small tasks: chunksize" },
    {
      t: "code",
      file: "squares.py · run on your computer",
      code: 'from concurrent.futures import ProcessPoolExecutor\n\n\ndef square(n: int) -> int:\n    return n * n\n\n\nif __name__ == "__main__":\n    with ProcessPoolExecutor() as pool:\n        results = list(pool.map(square, range(100_000), chunksize=5_000))\n    print(sum(results))',
      output: "333328333350000",
    },
    {
      t: "p",
      text: "Sending work to a process has a cost. For thousands of tiny tasks, `chunksize` sends them in groups so the overhead doesn't eat the speed-up. For truly tiny work like this, plain Python or NumPy is faster than any pool.",
    },
    { t: "h2", text: "When processes are worth it" },
    {
      t: "table",
      head: ["Good fit", "Poor fit"],
      rows: [
        ["Each task takes at least ~0.1 s of CPU time", "Tasks that finish in microseconds"],
        ["Inputs and outputs are small", "Huge data that must be copied to every worker"],
        ["Pure Python calculations", "Work already done in NumPy or pandas (they use fast C code)"],
        ["Batch jobs: resizing images, parsing files", "Waiting on networks — use threads or asyncio"],
      ],
    },
  ],
  exercise: {
    prompt:
      "Prepare work for a process pool. Write a top-level function `word_count(text: str) -> int`, then use the built-in `map` (exactly like `pool.map`) to count words in `docs = [\"one two\", \"three four five\", \"six\"]`. Print the list of counts and their total.",
    starter: 'def word_count(text: str) -> int:\n    ...\n\ndocs = ["one two", "three four five", "six"]\n',
    expected: "[2, 3, 1]\n6",
    hints: [
      "`text.split()` splits on any whitespace; `len()` counts the parts.",
      "`counts = list(map(word_count, docs))`",
      "print(counts) and print(sum(counts))",
    ],
    solution:
      'def word_count(text: str) -> int:\n    return len(text.split())\n\ndocs = ["one two", "three four five", "six"]\ncounts = list(map(word_count, docs))\nprint(counts)\nprint(sum(counts))',
  },
  quiz: [
    {
      q: "Why do processes run CPU-bound Python code in parallel when threads don't?",
      options: ["Processes are newer", "Each process has its own interpreter and GIL", "Processes skip error checking"],
      answer: 1,
      why: "Separate interpreters mean separate GILs, one per core.",
    },
    {
      q: "Why is `if __name__ == \"__main__\":` needed with process pools?",
      options: ["For speed", "Workers re-import the file; the guard stops them starting new pools", "It isn't needed"],
      answer: 1,
      why: "Without it, each worker would run the pool-creating code again.",
    },
    {
      q: "Which task is a poor fit for a process pool?",
      options: ["Resizing 500 photos", "Adding 1 to each of 10 numbers", "Parsing 200 large log files"],
      answer: 1,
      why: "The overhead of starting processes and copying data dwarfs tiny work.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
