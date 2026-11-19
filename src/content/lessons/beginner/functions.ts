import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "functions",
  path: "beginner",
  title: "Functions",
  description:
    "Python functions: def and return, parameters and default values, keyword arguments, type hints, docstrings, *args and **kwargs, scope and the mutable default trap.",
  minutes: 13,
  answer:
    "A function is a named, reusable block of code. You define it with `def name(parameters):`, send results back with `return`, and call it with `name(arguments)`. Functions keep code short, testable and easy to change, and type hints like `def area(w: float, h: float) -> float:` document what goes in and out.",
  blocks: [
    { t: "h2", text: "Defining and calling" },
    {
      t: "code",
      run: true,
      code: 'def greet(name: str) -> str:\n    """Return a friendly greeting."""\n    return f"Hello, {name}!"\n\nmessage = greet("Asha")\nprint(message)\nprint(greet("Ben"))',
      output: "Hello, Asha!\nHello, Ben!",
    },
    {
      t: "list",
      items: [
        "`def` starts the definition; the indented block is the body.",
        "`return` sends a value back. Without it, a function returns `None`.",
        "The text in triple quotes is a docstring — editors and AI tools show it as help.",
        "Type hints (`name: str`, `-> str`) don't change how code runs, but they make it clearer and let tools catch mistakes.",
      ],
    },
    { t: "h2", text: "Default values and keyword arguments" },
    {
      t: "code",
      run: true,
      code: 'def price_with_vat(amount: float, rate: float = 0.21) -> float:\n    return round(amount * (1 + rate), 2)\n\nprint(price_with_vat(100))\nprint(price_with_vat(100, 0.06))\nprint(price_with_vat(rate=0.09, amount=50))',
      output: "121.0\n106.0\n54.5",
    },
    {
      t: "p",
      text: "Parameters with defaults are optional. Naming arguments when you call (`rate=0.09`) makes calls self-explanatory and lets you pass them in any order.",
    },
    { t: "h2", text: "Returning several values" },
    {
      t: "code",
      run: true,
      code: 'def stats(numbers: list[float]) -> tuple[float, float, float]:\n    return min(numbers), max(numbers), sum(numbers) / len(numbers)\n\nlow, high, mean = stats([4, 8, 15, 16, 23, 42])\nprint(low, high, mean)',
      output: "4 42 18.0",
    },
    { t: "h2", text: "Any number of arguments" },
    {
      t: "code",
      run: true,
      code: 'def total(*numbers: float) -> float:\n    return sum(numbers)\n\ndef profile(**details: str) -> None:\n    for key, value in details.items():\n        print(f"{key} = {value}")\n\nprint(total(1, 2, 3, 4))\nprofile(name="Ana", city="Ghent")',
      output: "10\nname = Ana\ncity = Ghent",
    },
    {
      t: "p",
      text: "`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra named arguments into a dictionary.",
    },
    { t: "h2", text: "Scope: variables inside functions" },
    {
      t: "code",
      run: true,
      code: 'count = 10\n\ndef demo():\n    count = 99      # a new local variable\n    return count\n\nprint(demo())\nprint(count)',
      output: "99\n10",
    },
    {
      t: "p",
      text: "Variables created inside a function exist only there. Pass values in as parameters and send results out with `return` — avoid changing global variables.",
    },
    { t: "h2", text: "The mutable default trap" },
    {
      t: "code",
      run: true,
      code: 'def add_item(item, basket=[]):      # bug!\n    basket.append(item)\n    return basket\n\nprint(add_item("apple"))\nprint(add_item("pear"))\n\ndef add_item_fixed(item, basket=None):\n    if basket is None:\n        basket = []\n    basket.append(item)\n    return basket\n\nprint(add_item_fixed("apple"))\nprint(add_item_fixed("pear"))',
      output: "['apple']\n['apple', 'pear']\n['apple']\n['pear']",
    },
    {
      t: "note",
      tone: "warn",
      title: "Never use [] or {} as a default",
      text: "A default value is created once, when the function is defined, and shared by every call. Use `None` and create the list inside the function.",
    },
  ],
  exercise: {
    prompt:
      "Write a function `to_fahrenheit(celsius: float) -> float` that returns `celsius * 9 / 5 + 32`. Then print the result for `0`, `37` and `-40`, one per line.",
    starter: "def to_fahrenheit(celsius: float) -> float:\n    # return the converted value\n    ...\n\n",
    expected: "32.0\n98.6\n-40.0",
    hints: [
      "The body needs one line that starts with `return`.",
      "`return celsius * 9 / 5 + 32`",
      "Then call it three times: `print(to_fahrenheit(0))` and so on.",
    ],
    solution:
      "def to_fahrenheit(celsius: float) -> float:\n    return celsius * 9 / 5 + 32\n\nprint(to_fahrenheit(0))\nprint(to_fahrenheit(37))\nprint(to_fahrenheit(-40))",
  },
  quiz: [
    {
      q: "What does a function return if it has no `return` statement?",
      options: ["0", "None", "An empty string"],
      answer: 1,
      why: "Every function returns something; without `return` it's `None`.",
    },
    {
      q: "Do type hints make Python check types when the code runs?",
      options: ["Yes, always", "No, they're for people and tools", "Only for numbers"],
      answer: 1,
      why: "Python ignores hints at runtime; tools like mypy, IDEs and AI assistants use them.",
    },
    {
      q: "Why is `def f(items=[]):` a problem?",
      options: ["It's a syntax error", "The same list is shared between calls", "Lists can't be parameters"],
      answer: 1,
      why: "The default list is created once and keeps its contents across calls.",
    },
  ],
  field: {
    title: "From the field",
    text: "Small functions with clear names and type hints are also what makes AI coding assistants useful: they understand a 10-line typed function far better than a 200-line script, and so do your colleagues.",
  },
  updated: "2026-11-19",
};

export default lesson;
