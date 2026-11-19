import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "threads",
  path: "advanced",
  title: "Threads",
  description:
    "Python threading for I/O-bound work: ThreadPoolExecutor, submit and map, as_completed, sharing data safely with Lock and Queue, and common threading mistakes.",
  minutes: 12,
  answer:
    "Threads let one Python program wait on many slow things at once, such as web requests or file downloads. The easiest and safest way is `concurrent.futures.ThreadPoolExecutor`: give it a function and a list of inputs, and it runs them across a pool of threads. Protect shared data with a `Lock`, or avoid sharing by returning results.",
  blocks: [
    {
      t: "note",
      tone: "tip",
      title: "Run these on your computer",
      text: "Browsers don't allow Python to start threads, so the examples in this lesson are marked \"run on your computer\". Their output was produced with real Python.",
    },
    { t: "h2", text: "The problem: waiting in a row" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import time\n\ndef fetch(url: str) -> str:\n    time.sleep(1)                 # pretend network delay\n    return f"data from {url}"\n\nurls = ["a.com", "b.com", "c.com"]\nstart = time.perf_counter()\nresults = [fetch(u) for u in urls]\nprint(results)\nprint(f"{time.perf_counter() - start:.1f}s")',
      output: "['data from a.com', 'data from b.com', 'data from c.com']\n3.0s",
    },
    { t: "h2", text: "ThreadPoolExecutor" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import time\nfrom concurrent.futures import ThreadPoolExecutor\n\ndef fetch(url: str) -> str:\n    time.sleep(1)\n    return f"data from {url}"\n\nurls = ["a.com", "b.com", "c.com"]\nstart = time.perf_counter()\nwith ThreadPoolExecutor(max_workers=5) as pool:\n    results = list(pool.map(fetch, urls))\nprint(results)\nprint(f"{time.perf_counter() - start:.1f}s")',
      output: "['data from a.com', 'data from b.com', 'data from c.com']\n1.0s",
    },
    {
      t: "list",
      items: [
        "`pool.map(fetch, urls)` runs `fetch` for every URL and returns results in the original order.",
        "`max_workers` limits how many run at once — be polite to servers and stay within rate limits.",
        "The `with` block waits for all threads to finish before continuing.",
      ],
    },
    { t: "h2", text: "Handling results as they finish" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import time\nfrom concurrent.futures import ThreadPoolExecutor, as_completed\n\ndef download(name: str, seconds: float) -> str:\n    time.sleep(seconds)\n    if name == "broken.zip":\n        raise ConnectionError("server error")\n    return name\n\njobs = {"big.iso": 0.6, "small.txt": 0.1, "broken.zip": 0.3}\nwith ThreadPoolExecutor() as pool:\n    futures = {pool.submit(download, n, s): n for n, s in jobs.items()}\n    for future in as_completed(futures):\n        name = futures[future]\n        try:\n            print("done:", future.result())\n        except ConnectionError as err:\n            print(f"failed: {name} ({err})")',
      output: "done: small.txt\nfailed: broken.zip (server error)\ndone: big.iso",
    },
    {
      t: "p",
      text: "`submit` returns a Future — a placeholder for a result that isn't ready yet. `as_completed` yields futures in the order they finish, and `future.result()` re-raises any error from the thread so you can handle it.",
    },
    { t: "h2", text: "Shared data needs a Lock" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import threading\nfrom concurrent.futures import ThreadPoolExecutor\n\ncounter = 0\nlock = threading.Lock()\n\ndef add_many(n: int) -> None:\n    global counter\n    for _ in range(n):\n        with lock:          # only one thread at a time in here\n            counter += 1\n\nwith ThreadPoolExecutor(max_workers=4) as pool:\n    for _ in range(4):\n        pool.submit(add_many, 100_000)\nprint(counter)',
      output: "400000",
    },
    {
      t: "note",
      tone: "warn",
      title: "Race conditions",
      text: "`counter += 1` is really read, add, write. Two threads can read the same old value and one update gets lost. Prefer designs where each thread returns its own result and the main thread combines them; use a `Lock` when you must share.",
    },
    { t: "h2", text: "Producer and consumer with Queue" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import queue\nimport threading\n\ntasks: queue.Queue[str | None] = queue.Queue()\n\ndef worker() -> None:\n    while (item := tasks.get()) is not None:\n        print("processing", item)\n\nt = threading.Thread(target=worker)\nt.start()\nfor item in ["invoice-1", "invoice-2"]:\n    tasks.put(item)\ntasks.put(None)      # signal: no more work\nt.join()\nprint("all done")',
      output: "processing invoice-1\nprocessing invoice-2\nall done",
    },
  ],
  exercise: {
    prompt:
      "Plan a thread pool. Write `batches(items, size)` that splits a list into lists of at most `size` items (the way a pool hands work to workers). Print `batches(list(range(7)), 3)` and then how many batches 100 URLs make with `size=8`.",
    starter: "def batches(items: list, size: int) -> list[list]:\n    ...\n\n",
    expected: "[[0, 1, 2], [3, 4, 5], [6]]\n13",
    hints: [
      "Use `range(0, len(items), size)` to get the start of each batch.",
      "Slice: `items[i:i + size]`.",
      "return [items[i:i + size] for i in range(0, len(items), size)]",
    ],
    solution:
      "def batches(items: list, size: int) -> list[list]:\n    return [items[i:i + size] for i in range(0, len(items), size)]\n\nprint(batches(list(range(7)), 3))\nprint(len(batches(list(range(100)), 8)))",
  },
  quiz: [
    {
      q: "Which work do threads speed up in standard Python?",
      options: ["CPU-heavy calculations", "Waiting on networks and files", "Both equally"],
      answer: 1,
      why: "Threads release the GIL while waiting, so I/O overlaps.",
    },
    {
      q: "What does `as_completed` give you?",
      options: ["Results in input order", "Futures in the order they finish", "Only failed tasks"],
      answer: 1,
      why: "Use it to react to each result as soon as it's ready.",
    },
    {
      q: "How do you safely update a shared counter from several threads?",
      options: ["Just use `+=`", "Wrap the update in `with lock:`", "Use a global variable"],
      answer: 1,
      why: "A lock makes the read-add-write step happen one thread at a time.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
