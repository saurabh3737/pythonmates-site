import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "numbers",
  path: "beginner",
  title: "Numbers",
  description:
    "Python numbers: int and float, arithmetic operators, integer division and remainder, powers, rounding, converting text to numbers and why 0.1 + 0.2 isn't 0.3.",
  minutes: 10,
  answer:
    "Python has whole numbers (`int`, like `42`) and decimal numbers (`float`, like `3.14`). You calculate with `+ - * /`, use `//` for whole-number division, `%` for the remainder and `**` for powers. Integers can be as large as you like.",
  blocks: [
    { t: "h2", text: "The arithmetic operators" },
    {
      t: "table",
      head: ["Operator", "Meaning", "Example", "Result"],
      rows: [
        ["`+`", "Add", "`7 + 2`", "`9`"],
        ["`-`", "Subtract", "`7 - 2`", "`5`"],
        ["`*`", "Multiply", "`7 * 2`", "`14`"],
        ["`/`", "Divide (always a float)", "`7 / 2`", "`3.5`"],
        ["`//`", "Whole-number division", "`7 // 2`", "`3`"],
        ["`%`", "Remainder", "`7 % 2`", "`1`"],
        ["`**`", "Power", "`7 ** 2`", "`49`"],
      ],
    },
    {
      t: "code",
      run: true,
      code: "print(7 / 2)\nprint(8 / 2)\nprint(7 // 2)\nprint(7 % 2)\nprint(2 ** 10)",
      output: "3.5\n4.0\n3\n1\n1024",
    },
    {
      t: "p",
      text: "Notice that `8 / 2` gives `4.0`, not `4`: the `/` operator always returns a float. Use `//` when you want a whole number.",
    },
    { t: "h2", text: "Order of operations" },
    {
      t: "code",
      run: true,
      code: "print(2 + 3 * 4)\nprint((2 + 3) * 4)",
      output: "14\n20",
    },
    {
      t: "p",
      text: "Python follows normal maths rules: powers first, then `* / // %`, then `+ -`. Brackets make your intention clear.",
    },
    { t: "h2", text: "Big integers" },
    {
      t: "code",
      run: true,
      code: "print(2 ** 100)\nprint(1_000_000 * 3)",
      output: "1267650600228229401496703205376\n3000000",
    },
    {
      t: "p",
      text: "Python integers never overflow. Underscores like `1_000_000` are allowed in numbers just to make them easier to read.",
    },
    { t: "h2", text: "Converting and rounding" },
    {
      t: "code",
      run: true,
      code: 'text = "25"\nprint(int(text) + 5)\nprint(float("2.5") * 2)\nprint(round(3.14159, 2))\nprint(int(9.99))',
      output: "30\n5.0\n3.14\n9",
    },
    {
      t: "note",
      tone: "warn",
      title: "input() always gives text",
      text: "Values typed by a user or read from a file arrive as strings. Convert them with `int()` or `float()` before doing maths. Also note `int(9.99)` cuts off the decimals — it doesn't round.",
    },
    { t: "h2", text: "Why 0.1 + 0.2 isn't exactly 0.3" },
    {
      t: "code",
      run: true,
      code: "print(0.1 + 0.2)\nprint(round(0.1 + 0.2, 2))\n\nfrom decimal import Decimal\nprint(Decimal(\"0.1\") + Decimal(\"0.2\"))",
      output: "0.30000000000000004\n0.3\n0.3",
    },
    {
      t: "p",
      text: "Computers store floats in binary, so some decimals can't be stored exactly. That's true in every language, not just Python. For money, use the `decimal` module or count in whole cents.",
    },
  ],
  exercise: {
    prompt:
      "A trip costs 250 euros and is split between 3 friends. Print each friend's share rounded to 2 decimals, then on a second line the whole euros each pays (no decimals), then the euros left over.",
    starter: "total = 250\nfriends = 3\n# 1) share rounded to 2 decimals\n# 2) whole euros each\n# 3) euros left over\n",
    expected: "83.33\n83\n1",
    hints: [
      "Normal division `/` gives the exact share; wrap it in `round(..., 2)`.",
      "`//` gives whole euros and `%` gives what's left over.",
      "print(round(total / friends, 2)) then print(total // friends) then print(total % friends)",
    ],
    solution:
      "total = 250\nfriends = 3\nprint(round(total / friends, 2))\nprint(total // friends)\nprint(total % friends)",
  },
  quiz: [
    {
      q: "What is `10 / 5`?",
      options: ["2", "2.0", "An error"],
      answer: 1,
      why: "The `/` operator always returns a float, even when the result is whole.",
    },
    {
      q: "What is `17 % 5`?",
      options: ["3", "2", "3.4"],
      answer: 1,
      why: "`%` gives the remainder: 17 = 3 × 5 + 2.",
    },
    {
      q: 'What does `int("7") + 3` give?',
      options: ["73", "10", "An error"],
      answer: 1,
      why: "`int()` turns the text \"7\" into the number 7 before adding.",
    },
  ],
  field: {
    title: "From the field",
    text: "In banking systems, money is never stored as a float. Rounding errors of a fraction of a cent add up across millions of transactions — teams use `Decimal` or integer cents. It's one of the first things reviewers check.",
  },
  updated: "2026-11-19",
};

export default lesson;
