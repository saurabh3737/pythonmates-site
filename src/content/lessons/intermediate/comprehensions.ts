import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "comprehensions",
  path: "intermediate",
  title: "Comprehensions",
  description:
    "Python list, dict and set comprehensions and generator expressions: transform and filter data in one readable line, and know when a normal loop is better.",
  minutes: 10,
  answer:
    "A comprehension builds a new list, dict or set from another collection in one expression: `[x * 2 for x in numbers if x > 0]`. It reads as \"give me this, for each item, if a condition holds\". Use comprehensions for simple transforms and filters; switch to a normal loop when the logic needs more than one line.",
  blocks: [
    { t: "h2", text: "From loop to comprehension" },
    {
      t: "code",
      run: true,
      code: "prices = [10, 25, 8, 40]\n\n# the loop way\nwith_vat = []\nfor p in prices:\n    with_vat.append(round(p * 1.21, 2))\nprint(with_vat)\n\n# the comprehension way\nprint([round(p * 1.21, 2) for p in prices])",
      output: "[12.1, 30.25, 9.68, 48.4]\n[12.1, 30.25, 9.68, 48.4]",
    },
    {
      t: "p",
      text: "The pattern is `[expression for item in iterable]`. The expression decides what goes into the new list.",
    },
    { t: "h2", text: "Filtering with if" },
    {
      t: "code",
      run: true,
      code: 'words = ["python", "AI", "data", "ML", "pandas"]\nlong_words = [w for w in words if len(w) > 2]\nprint(long_words)\n\nlabels = ["big" if len(w) > 4 else "small" for w in words]\nprint(labels)',
      output: "['python', 'data', 'pandas']\n['big', 'small', 'small', 'small', 'big']",
    },
    {
      t: "note",
      tone: "tip",
      title: "Where does the if go?",
      text: "An `if` at the end filters items out. An `x if ... else y` at the front keeps every item but chooses what to output.",
    },
    { t: "h2", text: "Dict and set comprehensions" },
    {
      t: "code",
      run: true,
      code: 'names = ["ana", "ben", "cara"]\nlengths = {name: len(name) for name in names}\nprint(lengths)\n\nprices = {"tea": 2.5, "cake": 4.0, "coffee": 3.2}\ncheap = {k: v for k, v in prices.items() if v < 3.5}\nprint(cheap)\n\nemails = ["a@x.com", "b@y.org", "c@x.com"]\nprint(sorted({e.split("@")[1] for e in emails}))',
      output: "{'ana': 3, 'ben': 3, 'cara': 4}\n{'tea': 2.5, 'coffee': 3.2}\n['x.com', 'y.org']",
    },
    { t: "h2", text: "Nested loops" },
    {
      t: "code",
      run: true,
      code: "matrix = [[1, 2, 3], [4, 5, 6]]\nflat = [n for row in matrix for n in row]\nprint(flat)\n\npairs = [(x, y) for x in range(2) for y in range(3)]\nprint(pairs)",
      output: "[1, 2, 3, 4, 5, 6]\n[(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]",
    },
    {
      t: "p",
      text: "Read nested `for` parts left to right, in the same order you'd write the loops. Two levels is the readable limit — beyond that, use normal loops.",
    },
    { t: "h2", text: "Generator expressions" },
    {
      t: "code",
      run: true,
      code: "numbers = range(1, 1_000_001)\nprint(sum(n * n for n in numbers))\nprint(any(n > 999_999 for n in numbers))",
      output: "333333833333500000\nTrue",
    },
    {
      t: "p",
      text: "Round brackets instead of square ones create a generator: it produces values one at a time instead of building a whole list in memory. Perfect inside `sum()`, `any()`, `all()`, `max()`.",
    },
  ],
  exercise: {
    prompt:
      "From `temps = {\"Mon\": 12, \"Tue\": 19, \"Wed\": 23, \"Thu\": 17}` print, with comprehensions: a list of the days warmer than 15 degrees, then a dict that maps each day to its temperature in Fahrenheit (`c * 9 / 5 + 32`).",
    starter: 'temps = {"Mon": 12, "Tue": 19, "Wed": 23, "Thu": 17}\n',
    expected: "['Tue', 'Wed', 'Thu']\n{'Mon': 53.6, 'Tue': 66.2, 'Wed': 73.4, 'Thu': 62.6}",
    hints: [
      "Loop over `temps.items()` to get each day and temperature.",
      "List: `[day for day, c in temps.items() if c > 15]`.",
      "Dict: `{day: c * 9 / 5 + 32 for day, c in temps.items()}`.",
    ],
    solution:
      'temps = {"Mon": 12, "Tue": 19, "Wed": 23, "Thu": 17}\nprint([day for day, c in temps.items() if c > 15])\nprint({day: c * 9 / 5 + 32 for day, c in temps.items()})',
  },
  quiz: [
    {
      q: "What does `[x for x in range(6) if x % 2]` give?",
      options: ["[0, 2, 4]", "[1, 3, 5]", "[True, False, ...]"],
      answer: 1,
      why: "`x % 2` is 1 (truthy) for odd numbers, so only odd numbers are kept.",
    },
    {
      q: "What does `(n * 2 for n in data)` create?",
      options: ["A tuple", "A generator", "A list"],
      answer: 1,
      why: "Round brackets around a comprehension make a lazy generator, not a tuple.",
    },
    {
      q: "When should you use a normal loop instead?",
      options: ["Never", "When the logic needs several steps or side effects", "For lists longer than 100 items"],
      answer: 1,
      why: "Comprehensions are for simple transforms; complex logic is clearer as a loop.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
