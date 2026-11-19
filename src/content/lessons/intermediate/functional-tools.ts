import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "functional-tools",
  path: "intermediate",
  title: "Lambda, map, filter and reduce",
  description:
    "Python lambda functions, map(), filter() and functools.reduce(), plus sorted() with key, any(), all() and partial() — and when a comprehension is clearer.",
  minutes: 10,
  answer:
    "A `lambda` is a small unnamed function written in one line: `lambda x: x * 2`. `map()` applies a function to every item, `filter()` keeps items where a function returns true, and `reduce()` combines items into one value. In modern Python, lambdas shine as the `key` for `sorted()`, `min()` and `max()`, while comprehensions usually replace `map` and `filter`.",
  blocks: [
    { t: "h2", text: "Functions are values" },
    {
      t: "code",
      run: true,
      code: 'def shout(text: str) -> str:\n    return text.upper() + "!"\n\nspeak = shout          # no brackets: the function itself\nprint(speak("hello"))\n\nactions = [str.upper, str.lower, shout]\nfor action in actions:\n    print(action("Hi"))',
      output: "HELLO!\nHI\nhi\nHI!",
    },
    {
      t: "p",
      text: "Because functions are values, you can store them, put them in lists and pass them to other functions. Everything in this lesson builds on that idea.",
    },
    { t: "h2", text: "lambda" },
    {
      t: "code",
      run: true,
      code: "double = lambda x: x * 2\nprint(double(21))\n\nadd = lambda a, b: a + b\nprint(add(2, 3))",
      output: "42\n5",
    },
    {
      t: "note",
      tone: "tip",
      title: "Name it with def",
      text: "If you're assigning a lambda to a name, write a normal `def` instead — it gets a proper name in error messages and can have a docstring. Lambdas are best used inline.",
    },
    { t: "h2", text: "The best use: sort keys" },
    {
      t: "code",
      run: true,
      code: 'people = [("Ana", 31), ("Ben", 25), ("Cara", 38)]\nprint(sorted(people, key=lambda p: p[1]))\nprint(max(people, key=lambda p: p[1]))\n\nfiles = ["b.txt", "A.csv", "c.py"]\nprint(sorted(files, key=str.lower))',
      output: "[('Ben', 25), ('Ana', 31), ('Cara', 38)]\n('Cara', 38)\n['A.csv', 'b.txt', 'c.py']",
    },
    { t: "h2", text: "map() and filter()" },
    {
      t: "code",
      run: true,
      code: 'raw = [" 12 ", "7", " 30"]\nnumbers = list(map(int, raw))\nprint(numbers)\n\nbig = list(filter(lambda n: n > 10, numbers))\nprint(big)\n\n# the same with comprehensions\nprint([int(s) for s in raw])\nprint([n for n in numbers if n > 10])',
      output: "[12, 7, 30]\n[12, 30]\n[12, 7, 30]\n[12, 30]",
    },
    {
      t: "p",
      text: "`map(int, raw)` is neat when you already have a named function. For anything that needs a lambda, a comprehension is usually easier to read.",
    },
    { t: "h2", text: "reduce()" },
    {
      t: "code",
      run: true,
      code: "from functools import reduce\nimport math\n\nnumbers = [2, 3, 4]\nprint(reduce(lambda acc, n: acc * n, numbers))\nprint(math.prod(numbers))   # the built-in way",
      output: "24\n24",
    },
    {
      t: "p",
      text: "`reduce` walks through the list carrying a running result. Python already has `sum()`, `math.prod()`, `max()` and `\"\".join()` for the common cases — use those first.",
    },
    { t: "h2", text: "any(), all() and partial()" },
    {
      t: "code",
      run: true,
      code: 'from functools import partial\n\nscores = [72, 88, 95]\nprint(all(s >= 50 for s in scores))\nprint(any(s > 90 for s in scores))\n\ndef power(base: float, exponent: float) -> float:\n    return base ** exponent\n\nsquare = partial(power, exponent=2)\nprint(square(9))',
      output: "True\nTrue\n81",
    },
  ],
  exercise: {
    prompt:
      "Sort `products = [(\"mug\", 8.5), (\"tea\", 3.0), (\"lamp\", 24.0)]` from most to least expensive and print the result. Then print only the names of products under 10, using any approach you like.",
    starter: 'products = [("mug", 8.5), ("tea", 3.0), ("lamp", 24.0)]\n',
    expected: "[('lamp', 24.0), ('mug', 8.5), ('tea', 3.0)]\n['mug', 'tea']",
    hints: [
      "`sorted()` with `key=lambda p: p[1]` sorts by price.",
      "Add `reverse=True` for most expensive first.",
      "Names under 10: `[name for name, price in products if price < 10]`.",
    ],
    solution:
      'products = [("mug", 8.5), ("tea", 3.0), ("lamp", 24.0)]\nprint(sorted(products, key=lambda p: p[1], reverse=True))\nprint([name for name, price in products if price < 10])',
  },
  quiz: [
    {
      q: "What does `list(map(len, [\"a\", \"bb\"]))` give?",
      options: ["[1, 2]", "['a', 'bb']", "3"],
      answer: 0,
      why: "`map` applies `len` to each item.",
    },
    {
      q: "What is the most common good use of `lambda` today?",
      options: ["Replacing all functions", "As a `key` for sorting, min and max", "Making code faster"],
      answer: 1,
      why: "Short inline keys are where lambdas are clearest.",
    },
    {
      q: "What does `all([])` return?",
      options: ["True", "False", "An error"],
      answer: 0,
      why: "`all` is true when no item is false — and an empty list has no false items.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
