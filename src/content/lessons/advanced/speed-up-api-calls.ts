import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "speed-up-api-calls",
  path: "advanced",
  title: "Project: speed up API calls",
  description:
    "Case study: fetch data from many API endpoints sequentially, with a thread pool and with asyncio, measure the difference, and add rate limits, timeouts and retries like production code.",
  minutes: 20,
  answer:
    "When a program calls many APIs one after another, almost all the time is spent waiting. Running the calls concurrently — with `ThreadPoolExecutor` for existing code or `asyncio` with `httpx` for new code — cuts the total to roughly the slowest call. Production versions add a concurrency limit, timeouts and retries.",
  blocks: [
    { t: "h2", text: "The scenario" },
    {
      t: "p",
      text: "You need free cash flow (cash from operations minus capital expenditure) for a list of companies, and every company needs its own API request. The original version of this case study used a finance library that has since stopped working, so here we use a simulated API with realistic delays — the techniques are exactly the same for any real API.",
    },
    {
      t: "code",
      file: "fake_api.py",
      code: 'import random\nimport time\n\nDATA = {\n    "NEM": (2_870, 1_570), "FCX": (5_160, 4_810), "BHP": (20_670, 9_270),\n    "RIO": (15_600, 9_620), "VALE": (9_770, 6_400), "AAL": (3_960, 3_150),\n}\n\n\ndef get_cash_flow(ticker: str) -> dict:\n    """Pretend API: 0.5–1.0 s per call, like a real network round trip."""\n    time.sleep(random.uniform(0.5, 1.0))\n    operations, capex = DATA[ticker]\n    return {"ticker": ticker, "operations": operations, "capex": capex}\n\n\ndef free_cash_flow(row: dict) -> int:\n    return row["operations"] - row["capex"]',
    },
    { t: "h2", text: "Version 1: one by one" },
    {
      t: "code",
      file: "sequential.py · run on your computer",
      code: 'import time\nfrom fake_api import DATA, free_cash_flow, get_cash_flow\n\nstart = time.perf_counter()\nrows = [get_cash_flow(t) for t in DATA]\nfor row in rows:\n    print(f"{row[\'ticker\']:<5}{free_cash_flow(row):>8,}")\nprint(f"took {time.perf_counter() - start:.1f}s")',
      output: "NEM     1,300\nFCX       350\nBHP    11,400\nRIO     5,980\nVALE    3,370\nAAL       810\ntook 4.5s",
    },
    { t: "h2", text: "Version 2: a thread pool" },
    {
      t: "code",
      file: "threaded.py · run on your computer",
      code: 'import time\nfrom concurrent.futures import ThreadPoolExecutor\nfrom fake_api import DATA, free_cash_flow, get_cash_flow\n\nstart = time.perf_counter()\nwith ThreadPoolExecutor(max_workers=8) as pool:\n    rows = list(pool.map(get_cash_flow, DATA))\nfor row in rows:\n    print(f"{row[\'ticker\']:<5}{free_cash_flow(row):>8,}")\nprint(f"took {time.perf_counter() - start:.1f}s")',
      output: "NEM     1,300\nFCX       350\nBHP    11,400\nRIO     5,980\nVALE    3,370\nAAL       810\ntook 1.0s",
    },
    {
      t: "p",
      text: "Three changed lines, same results, about four times faster. `pool.map` keeps the original order, so the report doesn't change. This is the quickest win when your code already uses a blocking library such as `requests`.",
    },
    { t: "h2", text: "Version 3: asyncio" },
    {
      t: "code",
      file: "async_version.py · run on your computer",
      code: 'import asyncio\nimport random\nimport time\nfrom fake_api import DATA, free_cash_flow\n\n\nasync def get_cash_flow(ticker: str, limit: asyncio.Semaphore) -> dict:\n    async with limit:\n        await asyncio.sleep(random.uniform(0.5, 1.0))\n        operations, capex = DATA[ticker]\n        return {"ticker": ticker, "operations": operations, "capex": capex}\n\n\nasync def main() -> None:\n    limit = asyncio.Semaphore(10)\n    start = time.perf_counter()\n    rows = await asyncio.gather(*(get_cash_flow(t, limit) for t in DATA))\n    for row in rows:\n        print(f"{row[\'ticker\']:<5}{free_cash_flow(row):>8,}")\n    print(f"took {time.perf_counter() - start:.1f}s")\n\n\nasyncio.run(main())',
      output: "NEM     1,300\nFCX       350\nBHP    11,400\nRIO     5,980\nVALE    3,370\nAAL       810\ntook 1.0s",
    },
    {
      t: "table",
      head: ["Version", "Time for 6 calls", "Best when"],
      rows: [
        ["Sequential", "~4.5 s (sum of all calls)", "A handful of calls, simplicity matters most"],
        ["Thread pool", "~1 s (the slowest call)", "Existing code with `requests` or SDKs"],
        ["asyncio", "~1 s (the slowest call)", "Hundreds of calls, async libraries, web servers"],
      ],
    },
    { t: "h2", text: "Making it production-ready" },
    {
      t: "code",
      file: "real_api.py",
      code: 'import asyncio\n\nimport httpx\n\n\nasync def fetch_json(client: httpx.AsyncClient, url: str, retries: int = 3) -> dict:\n    for attempt in range(1, retries + 1):\n        try:\n            response = await client.get(url, timeout=10)\n            response.raise_for_status()\n            return response.json()\n        except (httpx.TransportError, httpx.HTTPStatusError) as err:\n            if attempt == retries:\n                raise\n            await asyncio.sleep(2 ** attempt)     # back off: 2 s, 4 s...\n    raise RuntimeError("unreachable")\n\n\nasync def fetch_all(urls: list[str], max_concurrent: int = 5) -> list[dict]:\n    limit = asyncio.Semaphore(max_concurrent)\n    async with httpx.AsyncClient() as client:\n        async def guarded(url: str) -> dict:\n            async with limit:\n                return await fetch_json(client, url)\n        return await asyncio.gather(*(guarded(u) for u in urls))',
    },
    {
      t: "list",
      items: [
        "One shared `AsyncClient` reuses connections instead of opening a new one per request.",
        "`timeout=10` stops one hanging server from freezing the whole job.",
        "Retries with exponential back-off survive brief outages without hammering the server.",
        "A `Semaphore` respects the API's rate limit. Check the provider's documented limits.",
      ],
    },
  ],
  exercise: {
    prompt:
      "Compute free cash flow for the report. Given `rows = [{\"ticker\": \"NEM\", \"operations\": 2870, \"capex\": 1570}, {\"ticker\": \"FCX\", \"operations\": 5160, \"capex\": 4810}, {\"ticker\": \"BHP\", \"operations\": 20670, \"capex\": 9270}]`, print each ticker with its free cash flow like `NEM: 1300`, then the ticker with the highest free cash flow.",
    starter:
      'rows = [\n    {"ticker": "NEM", "operations": 2870, "capex": 1570},\n    {"ticker": "FCX", "operations": 5160, "capex": 4810},\n    {"ticker": "BHP", "operations": 20670, "capex": 9270},\n]\n',
    expected: "NEM: 1300\nFCX: 350\nBHP: 11400\nBHP",
    hints: [
      'Free cash flow is `row["operations"] - row["capex"]`.',
      'Loop and print(f"{row[\'ticker\']}: {fcf}").',
      'For the best: max(rows, key=lambda r: r["operations"] - r["capex"])["ticker"]',
    ],
    solution:
      'rows = [\n    {"ticker": "NEM", "operations": 2870, "capex": 1570},\n    {"ticker": "FCX", "operations": 5160, "capex": 4810},\n    {"ticker": "BHP", "operations": 20670, "capex": 9270},\n]\nfor row in rows:\n    print(f"{row[\'ticker\']}: {row[\'operations\'] - row[\'capex\']}")\nbest = max(rows, key=lambda r: r["operations"] - r["capex"])\nprint(best["ticker"])',
  },
  quiz: [
    {
      q: "Six API calls take 0.5–1.0 s each. Run concurrently, the total is about...",
      options: ["The sum of all calls", "The slowest call", "Half the sum"],
      answer: 1,
      why: "The calls overlap, so you only wait for the longest one.",
    },
    {
      q: "Why add a Semaphore when calling an API?",
      options: ["To make calls faster", "To respect the provider's rate limit", "To cache responses"],
      answer: 1,
      why: "Firing hundreds of calls at once can get you blocked or throttled.",
    },
    {
      q: "Your code uses `requests` everywhere. The quickest speed-up is...",
      options: ["Rewrite it all in asyncio", "Wrap the calls in a ThreadPoolExecutor", "Use multiprocessing"],
      answer: 1,
      why: "Thread pools work with blocking libraries and need only a few changed lines.",
    },
  ],
  field: {
    title: "From the field",
    text: "This exact pattern — many independent API calls collected into one report — appears in finance, data engineering and AI agent tools. The thread-pool version is often a 5-minute change that turns an hour-long nightly job into a few minutes.",
  },
  updated: "2026-11-19",
};

export default lesson;
