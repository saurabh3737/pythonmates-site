import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "strings",
  path: "beginner",
  title: "Strings",
  description:
    "Python strings: quotes, indexing and slicing, useful methods like upper, strip, split and replace, f-string formatting and why strings can't be changed in place.",
  minutes: 11,
  answer:
    "A string (`str`) is text inside quotes, such as `\"hello\"`. You can read characters by position (`text[0]`), cut pieces out with slices (`text[0:5]`) and use methods like `.upper()`, `.strip()` and `.split()`. Strings never change — methods return a new string.",
  blocks: [
    { t: "h2", text: "Creating strings" },
    {
      t: "code",
      run: true,
      code: 'single = \'Python\'\ndouble = "It\'s easy"\nmulti = """Line one\nLine two"""\nprint(single)\nprint(double)\nprint(multi)',
      output: "Python\nIt's easy\nLine one\nLine two",
    },
    {
      t: "p",
      text: "Single and double quotes work the same way — pick the one that avoids clashing with quotes inside the text. Triple quotes allow several lines.",
    },
    { t: "h2", text: "Indexing and slicing" },
    {
      t: "code",
      run: true,
      code: 'word = "Python"\nprint(word[0])\nprint(word[-1])\nprint(word[0:3])\nprint(word[2:])\nprint(word[::-1])\nprint(len(word))',
      output: "P\nn\nPyt\nthon\nnohtyP\n6",
    },
    {
      t: "list",
      items: [
        "Positions start at `0`. Negative positions count from the end: `-1` is the last character.",
        "`text[start:stop]` includes `start` but stops just before `stop`.",
        "Leave out `start` or `stop` to go from the beginning or to the end. `[::-1]` reverses.",
        "`len()` gives the number of characters.",
      ],
    },
    { t: "h2", text: "Everyday string methods" },
    {
      t: "code",
      run: true,
      code: 'raw = "  Hello, Python World  "\nclean = raw.strip()\nprint(clean)\nprint(clean.upper())\nprint(clean.lower())\nprint(clean.replace("World", "learners"))\nprint(clean.split(", "))\nprint(clean.startswith("Hello"))\nprint("Python" in clean)',
      output:
        "Hello, Python World\nHELLO, PYTHON WORLD\nhello, python world\nHello, Python learners\n['Hello', 'Python World']\nTrue\nTrue",
    },
    { t: "h2", text: "Strings can't be changed in place" },
    {
      t: "code",
      run: true,
      code: 'name = "asha"\nname.upper()\nprint(name)\n\nname = name.upper()\nprint(name)',
      output: "asha\nASHA",
    },
    {
      t: "note",
      tone: "warn",
      title: "A classic beginner bug",
      text: "`name.upper()` returns a new string; it doesn't change `name`. Save the result: `name = name.upper()`.",
    },
    { t: "h2", text: "Joining and formatting" },
    {
      t: "code",
      run: true,
      code: 'parts = ["2026", "11", "19"]\nprint("-".join(parts))\n\nprice = 1234.5\nprint(f"Total: {price:,.2f} EUR")\nprint(f"{\'left\':<8}|{\'right\':>8}|")',
      output: "2026-11-19\nTotal: 1,234.50 EUR\nleft    |   right|",
    },
    {
      t: "p",
      text: "`\"-\".join(list)` glues pieces together. Inside an f-string, a format spec after `:` controls the look: `,.2f` adds thousands separators and 2 decimals, `<8` and `>8` pad to a width of 8.",
    },
  ],
  exercise: {
    prompt:
      "Clean up `email = \"  Asha.Rao@Example.COM \"`: remove the spaces, make it lowercase, then print the cleaned email and, on a second line, only the part after the `@`.",
    starter: 'email = "  Asha.Rao@Example.COM "\n# Clean it, then print it and the domain\n',
    expected: "asha.rao@example.com\nexample.com",
    hints: [
      "`.strip()` removes spaces at both ends and `.lower()` makes it lowercase — you can chain them.",
      "`.split(\"@\")` gives a list of two parts; the domain is at position 1.",
      'clean = email.strip().lower() then print(clean) and print(clean.split("@")[1])',
    ],
    solution:
      'email = "  Asha.Rao@Example.COM "\nclean = email.strip().lower()\nprint(clean)\nprint(clean.split("@")[1])',
  },
  quiz: [
    {
      q: 'What is `"Python"[1:4]`?',
      options: ["Pyt", "yth", "ytho"],
      answer: 1,
      why: "The slice starts at position 1 (y) and stops before position 4.",
    },
    {
      q: 'After `s = "hi"` and `s.upper()`, what is `s`?',
      options: ["HI", "hi", "An error"],
      answer: 1,
      why: "Strings can't change. `upper()` returns a new string that wasn't saved.",
    },
    {
      q: 'What does `", ".join(["a", "b", "c"])` give?',
      options: ["abc", "a, b, c", "['a', 'b', 'c']"],
      answer: 1,
      why: "`join` puts the separator between each item.",
    },
  ],
  field: {
    title: "From the field",
    text: "Most real-world data bugs are text bugs: extra spaces, different capitalisation, invisible characters in a CSV export. A simple `.strip().lower()` before comparing values fixes a surprising number of production issues.",
  },
  updated: "2026-11-19",
};

export default lesson;
