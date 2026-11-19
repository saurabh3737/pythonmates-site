import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "type-hints",
  path: "intermediate",
  title: "Type hints",
  description:
    "Modern Python type hints: annotating variables and functions, list[int] and dict[str, float], optional values with X | None, type aliases, TypedDict, generics and checking with mypy.",
  minutes: 11,
  answer:
    "Type hints describe what types a variable, parameter or return value should have, like `def total(prices: list[float]) -> float:`. Python doesn't enforce them while running; instead your editor, type checkers such as mypy, and AI coding assistants use them to catch mistakes early and understand your code.",
  blocks: [
    { t: "h2", text: "The basics" },
    {
      t: "code",
      run: true,
      code: 'def total(prices: list[float], discount: float = 0.0) -> float:\n    return round(sum(prices) * (1 - discount), 2)\n\ncity: str = "Ghent"\nscores: dict[str, int] = {"ana": 91, "ben": 78}\nlocation: tuple[float, float] = (51.05, 3.72)\n\nprint(total([10.0, 20.5], discount=0.1))\nprint(total.__annotations__)',
      output: "27.45\n{'prices': list[float], 'discount': <class 'float'>, 'return': <class 'float'>}",
    },
    {
      t: "p",
      text: "Use the built-in names directly: `list[int]`, `dict[str, float]`, `tuple[int, ...]`, `set[str]`. Older code imports `List` and `Dict` from `typing` — that's no longer needed.",
    },
    { t: "h2", text: "Hints don't stop wrong values" },
    {
      t: "code",
      run: true,
      code: 'def double(x: int) -> int:\n    return x * 2\n\nprint(double("ha"))   # runs fine — Python ignores hints at runtime',
      output: "haha",
    },
    {
      t: "p",
      text: "A type checker would flag that call before you run it. That's the point: hints move bugs from production to your editor.",
    },
    { t: "h2", text: "Optional values and unions" },
    {
      t: "code",
      run: true,
      code: 'def find_user(user_id: int) -> str | None:\n    users = {1: "Ana", 2: "Ben"}\n    return users.get(user_id)\n\ndef parse(value: str) -> int | float:\n    return float(value) if "." in value else int(value)\n\nname = find_user(3)\nif name is None:\n    print("No such user")\nprint(parse("7"), parse("7.5"))',
      output: "No such user\n7 7.5",
    },
    {
      t: "note",
      tone: "tip",
      title: "X | None means \"might be missing\"",
      text: "A checker will then remind you to handle `None` before using the value — the most common bug it catches.",
    },
    { t: "h2", text: "Aliases, TypedDict and Literal" },
    {
      t: "code",
      run: true,
      code: 'from typing import Literal, TypedDict\n\ntype Matrix = list[list[float]]\n\nclass Movie(TypedDict):\n    title: str\n    year: int\n\nStatus = Literal["draft", "published"]\n\ndef describe(movie: Movie, status: Status) -> str:\n    return f"{movie[\'title\']} ({movie[\'year\']}) — {status}"\n\nidentity: Matrix = [[1, 0], [0, 1]]\nprint(describe({"title": "Arrival", "year": 2016}, "published"))\nprint(len(identity))',
      output: "Arrival (2016) — published\n2",
    },
    {
      t: "list",
      items: [
        "`type Name = ...` (Python 3.12+) gives a long type a short name.",
        "`TypedDict` describes the keys of a dictionary, e.g. JSON from an API.",
        "`Literal` limits a value to a few exact options.",
      ],
    },
    { t: "h2", text: "Generic functions" },
    {
      t: "code",
      run: true,
      code: 'def first[T](items: list[T]) -> T:\n    return items[0]\n\nprint(first([3, 1, 2]))\nprint(first(["x", "y"]))',
      output: "3\nx",
    },
    {
      t: "p",
      text: "`[T]` after the name (Python 3.12+) says \"whatever type goes in, the same type comes out\", so the checker knows `first([3, 1, 2])` is an `int`.",
    },
    { t: "h2", text: "Checking your code" },
    {
      t: "code",
      file: "terminal",
      code: '$ uv add --dev mypy\n$ uv run mypy app.py\napp.py:4: error: Argument 1 to "double" has incompatible type "str"; expected "int"\nFound 1 error in 1 file (checked 1 source file)',
    },
    {
      t: "p",
      text: "Popular checkers are mypy and Pyright (built into VS Code's Pylance). Start by adding hints to function signatures; you rarely need them on local variables.",
    },
  ],
  exercise: {
    prompt:
      "Write a fully type-hinted function `average(values: list[float]) -> float | None` that returns `None` for an empty list and the rounded (2 decimals) average otherwise. Print the result for `[4.0, 5.5, 9.0]` and for `[]`.",
    starter: "def average(values: list[float]) -> float | None:\n    ...\n\n",
    expected: "6.17\nNone",
    hints: [
      "Check `if not values:` first and return `None`.",
      "Otherwise return `round(sum(values) / len(values), 2)`.",
      "print(average([4.0, 5.5, 9.0])) and print(average([]))",
    ],
    solution:
      "def average(values: list[float]) -> float | None:\n    if not values:\n        return None\n    return round(sum(values) / len(values), 2)\n\nprint(average([4.0, 5.5, 9.0]))\nprint(average([]))",
  },
  quiz: [
    {
      q: "Does Python raise an error when a hinted function gets the wrong type?",
      options: ["Yes, always", "No, hints are checked by tools, not at runtime", "Only for int and str"],
      answer: 1,
      why: "Runtime ignores hints; mypy, Pyright and IDEs check them.",
    },
    {
      q: "How do you write \"a string or nothing\"?",
      options: ["`str?`", "`str | None`", "`Optional(str)`"],
      answer: 1,
      why: "`str | None` is the modern spelling (older code uses `Optional[str]`).",
    },
    {
      q: "Which is the modern way to hint a list of integers?",
      options: ["`List[int]` from typing", "`list[int]`", "`[int]`"],
      answer: 1,
      why: "Built-in generics like `list[int]` work since Python 3.9.",
    },
  ],
  field: {
    title: "From the field",
    text: "Type hints have become even more valuable with AI assistants: a typed function signature tells the model exactly what a function expects, and the generated code fits on the first try far more often.",
  },
  updated: "2026-11-19",
};

export default lesson;
