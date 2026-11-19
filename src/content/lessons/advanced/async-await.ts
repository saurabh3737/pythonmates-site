import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "async-await",
  path: "advanced",
  title: "async and await",
  description:
    "Python asyncio explained: coroutines with async def and await, running tasks together with gather and TaskGroup, timeouts, limiting concurrency with a Semaphore, and when to choose async.",
  minutes: 13,
  answer:
    "`async def` defines a coroutine — a function that can pause at each `await` while it waits for something, letting other coroutines run in the meantime. `asyncio.run()` starts the event loop, and `asyncio.gather()` or a `TaskGroup` runs many coroutines concurrently in a single thread. Async shines when a program handles hundreds or thousands of network connections.",
  blocks: [
    { t: "h2", text: "Your first coroutine" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import asyncio\n\nasync def greet(name: str, delay: float) -> str:\n    await asyncio.sleep(delay)      # pause here; others may run\n    return f"Hello, {name}"\n\nasync def main() -> None:\n    message = await greet("Ana", 0.5)\n    print(message)\n\nasyncio.run(main())',
      output: "Hello, Ana",
    },
    {
      t: "list",
      items: [
        "Calling `greet(...)` doesn't run it; it creates a coroutine object.",
        "`await` runs a coroutine and waits for its result — only allowed inside `async def`.",
        "`asyncio.run(main())` starts the event loop: the scheduler that switches between coroutines.",
      ],
    },
    { t: "h2", text: "Running many at once" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import asyncio\nimport time\n\nasync def fetch(url: str) -> str:\n    await asyncio.sleep(1)          # pretend network call\n    return f"data from {url}"\n\nasync def main() -> None:\n    start = time.perf_counter()\n    results = await asyncio.gather(\n        fetch("a.com"), fetch("b.com"), fetch("c.com")\n    )\n    print(results)\n    print(f"{time.perf_counter() - start:.1f}s")\n\nasyncio.run(main())',
      output: "['data from a.com', 'data from b.com', 'data from c.com']\n1.0s",
    },
    {
      t: "p",
      text: "Three one-second waits finish in one second, all in a single thread. `gather` returns results in the order you passed the coroutines.",
    },
    { t: "h2", text: "TaskGroup: structured and safe" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import asyncio\n\nasync def job(name: str, seconds: float) -> str:\n    await asyncio.sleep(seconds)\n    return name\n\nasync def main() -> None:\n    async with asyncio.TaskGroup() as tg:\n        slow = tg.create_task(job("report", 0.3))\n        fast = tg.create_task(job("email", 0.1))\n    print(fast.result(), slow.result())\n\nasyncio.run(main())',
      output: "email report",
    },
    {
      t: "p",
      text: "A `TaskGroup` (Python 3.11+) waits for every task when the block ends. If one task fails, the others are cancelled and the error is raised — no forgotten background tasks.",
    },
    { t: "h2", text: "Timeouts" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import asyncio\n\nasync def slow_api() -> str:\n    await asyncio.sleep(5)\n    return "finally"\n\nasync def main() -> None:\n    try:\n        async with asyncio.timeout(1):\n            print(await slow_api())\n    except TimeoutError:\n        print("Gave up after 1 second")\n\nasyncio.run(main())',
      output: "Gave up after 1 second",
    },
    { t: "h2", text: "Limiting concurrency" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import asyncio\n\nlimit = asyncio.Semaphore(3)     # at most 3 at a time\nactive = 0\npeak = 0\n\nasync def call_api(i: int) -> int:\n    global active, peak\n    async with limit:\n        active += 1\n        peak = max(peak, active)\n        await asyncio.sleep(0.1)\n        active -= 1\n        return i * 2\n\nasync def main() -> None:\n    results = await asyncio.gather(*(call_api(i) for i in range(10)))\n    print(sum(results), "peak concurrency:", peak)\n\nasyncio.run(main())',
      output: "90 peak concurrency: 3",
    },
    {
      t: "note",
      tone: "warn",
      title: "Never block the event loop",
      text: "Inside `async def`, use `await asyncio.sleep()`, not `time.sleep()`, and async libraries such as `httpx` or `aiohttp` instead of `requests`. One blocking call freezes every other coroutine. For unavoidable blocking code, use `await asyncio.to_thread(func)`.",
    },
    { t: "h2", text: "Threads or async?" },
    {
      t: "table",
      head: ["", "Threads", "asyncio"],
      rows: [
        ["Best for", "Tens of I/O tasks, existing sync libraries", "Hundreds to thousands of connections"],
        ["Libraries", "Any (`requests`, database drivers)", "Async ones (`httpx`, `asyncpg`)"],
        ["Switching", "The OS decides, at any moment", "Only at `await`, so fewer race conditions"],
        ["Used by", "Scripts, data jobs", "FastAPI, chat servers, LLM streaming"],
      ],
    },
  ],
  exercise: {
    prompt:
      "Estimate the gain from async. Given call durations `durations = [1.2, 0.4, 0.9, 0.3]` (seconds), print the total time if you await them one by one, then the time with `gather` (they overlap, so it's the slowest one). Round both to 1 decimal.",
    starter: "durations = [1.2, 0.4, 0.9, 0.3]\n",
    expected: "2.8\n1.2",
    hints: [
      "One by one, the waits add up: `sum(durations)`.",
      "Concurrently, you wait only for the longest: `max(durations)`.",
      "print(round(sum(durations), 1)) and print(round(max(durations), 1))",
    ],
    solution: "durations = [1.2, 0.4, 0.9, 0.3]\nprint(round(sum(durations), 1))\nprint(round(max(durations), 1))",
  },
  quiz: [
    {
      q: "What happens when you call an `async def` function without `await`?",
      options: ["It runs immediately", "You get a coroutine object that hasn't run", "An error"],
      answer: 1,
      why: "Coroutines only run when awaited or scheduled as tasks.",
    },
    {
      q: "Why is `time.sleep()` a problem inside a coroutine?",
      options: ["It's slower", "It blocks the whole event loop", "It doesn't exist in async code"],
      answer: 1,
      why: "Use `await asyncio.sleep()` so other coroutines can run.",
    },
    {
      q: "What does `asyncio.Semaphore(5)` help with?",
      options: ["Retrying failed calls", "Keeping at most 5 operations running at once", "Running 5 times faster"],
      answer: 1,
      why: "It's how you respect API rate limits while still running concurrently.",
    },
  ],
  field: {
    title: "From the field",
    text: "Most LLM applications are async under the hood: streaming tokens to many users at once, calling several models or tools in parallel, and putting a timeout on every external call. FastAPI and the major LLM SDKs all offer async clients.",
  },
  updated: "2026-11-19",
};

export default lesson;
