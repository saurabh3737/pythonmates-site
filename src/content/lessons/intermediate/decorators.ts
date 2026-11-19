import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "decorators",
  path: "intermediate",
  title: "Decorators",
  description:
    "Python decorators step by step: functions as objects, closures, writing a decorator with functools.wraps, decorators with arguments, and real uses like timing, retries and caching.",
  minutes: 13,
  answer:
    "A decorator is a function that takes another function and returns an improved version of it. Writing `@timer` above `def work():` is short for `work = timer(work)`. Decorators add behaviour such as logging, timing, retries or caching without touching the function's own code.",
  blocks: [
    { t: "h2", text: "Step 1: functions inside functions" },
    {
      t: "code",
      run: true,
      code: 'def make_multiplier(factor: int):\n    def multiply(x: int) -> int:\n        return x * factor      # remembers factor\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(10), triple(10))',
      output: "20 30",
    },
    {
      t: "p",
      text: "The inner function remembers `factor` even after `make_multiplier` has finished. That's called a closure, and it's the engine behind every decorator.",
    },
    { t: "h2", text: "Step 2: a function that wraps a function" },
    {
      t: "code",
      run: true,
      code: 'def shout(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return result.upper()\n    return wrapper\n\ndef greet(name: str) -> str:\n    return f"hello, {name}"\n\nloud_greet = shout(greet)\nprint(loud_greet("ana"))',
      output: "HELLO, ANA",
    },
    { t: "h2", text: "Step 3: the @ syntax" },
    {
      t: "code",
      run: true,
      code: 'import functools\n\ndef shout(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@shout\ndef greet(name: str) -> str:\n    """Greet someone."""\n    return f"hello, {name}"\n\nprint(greet("ben"))\nprint(greet.__name__, "-", greet.__doc__)',
      output: "HELLO, BEN\ngreet - Greet someone.",
    },
    {
      t: "note",
      tone: "tip",
      title: "Always use functools.wraps",
      text: "Without `@functools.wraps(func)`, the decorated function would be called `wrapper` and lose its docstring — confusing in error messages, docs and tests.",
    },
    { t: "h2", text: "A practical decorator: timing" },
    {
      t: "code",
      run: true,
      code: 'import functools\nimport time\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{func.__name__} took {elapsed:.3f}s")\n        return result\n    return wrapper\n\n@timer\ndef total(n: int) -> int:\n    return sum(range(n))\n\nresult = total(2_000_000)\nprint(result)',
    },
    { t: "h2", text: "Decorators with arguments" },
    {
      t: "code",
      run: true,
      code: 'import functools\n\ndef retry(times: int):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for attempt in range(1, times + 1):\n                try:\n                    return func(*args, **kwargs)\n                except ConnectionError as err:\n                    print(f"Attempt {attempt} failed: {err}")\n            raise ConnectionError(f"gave up after {times} attempts")\n        return wrapper\n    return decorator\n\ncalls = 0\n\n@retry(times=3)\ndef fetch() -> str:\n    global calls\n    calls += 1\n    if calls < 3:\n        raise ConnectionError("server busy")\n    return "data received"\n\nprint(fetch())',
      output: "Attempt 1 failed: server busy\nAttempt 2 failed: server busy\ndata received",
    },
    {
      t: "p",
      text: "A decorator with arguments needs one extra layer: `retry(times=3)` returns the actual decorator, which then wraps the function.",
    },
    { t: "h2", text: "Built-in decorators you'll use" },
    {
      t: "code",
      run: true,
      code: "from functools import cache\n\n@cache\ndef fib(n: int) -> int:\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(80))\nprint(fib.cache_info().hits > 0)",
      output: "23416728348467685\nTrue",
    },
    {
      t: "list",
      items: [
        "`@functools.cache` and `@lru_cache` remember results of expensive calls.",
        "`@property`, `@staticmethod` and `@classmethod` shape methods in classes.",
        "`@dataclass` writes class boilerplate.",
        "Web frameworks use decorators for routes, e.g. `@app.get(\"/items\")` in FastAPI.",
      ],
    },
  ],
  exercise: {
    prompt:
      "Write a decorator `log_call` that prints `Calling NAME` before running the function (use `func.__name__`) and then returns the function's result. Decorate `def add(a, b): return a + b` with it and print `add(2, 3)`.",
    starter: "import functools\n\ndef log_call(func):\n    ...\n\n",
    expected: "Calling add\n5",
    hints: [
      "Inside `log_call`, define `wrapper(*args, **kwargs)` and return it at the end.",
      'In `wrapper`: print(f"Calling {func.__name__}") then return func(*args, **kwargs).',
      "Put `@functools.wraps(func)` above `wrapper`, and `@log_call` above `def add`.",
    ],
    solution:
      'import functools\n\ndef log_call(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f"Calling {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_call\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))',
  },
  quiz: [
    {
      q: "`@timer` above `def work():` is the same as...",
      options: ["`timer = work(timer)`", "`work = timer(work)`", "`work.timer()`"],
      answer: 1,
      why: "The decorator receives the function and its result replaces the name.",
    },
    {
      q: "Why use `*args, **kwargs` in a wrapper?",
      options: ["It's faster", "So the wrapper accepts whatever arguments the function takes", "It's required syntax"],
      answer: 1,
      why: "It lets one decorator work with any function signature.",
    },
    {
      q: "What does `@functools.cache` do?",
      options: ["Saves the function to disk", "Remembers results for arguments it has seen", "Runs the function in the background"],
      answer: 1,
      why: "Repeated calls with the same arguments return the stored result instantly.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
