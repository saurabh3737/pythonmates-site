import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "variables",
  path: "beginner",
  title: "Variables",
  description:
    "Python variables explained: creating and naming variables, snake_case, dynamic types, type(), multiple assignment, constants and f-strings.",
  minutes: 9,
  answer:
    "A variable is a name that points to a value, created the first time you assign to it with `=` — for example `age = 30`. Python works out the type automatically, and you can point the same name at a new value at any time.",
  blocks: [
    { t: "h2", text: "Creating variables" },
    {
      t: "code",
      run: true,
      code: 'name = "Asha"\nage = 30\nheight_m = 1.68\nis_student = False\n\nprint(name, age, height_m, is_student)',
      output: "Asha 30 1.68 False",
    },
    {
      t: "p",
      text: "There's no separate declaration step. `=` means \"make this name point to this value\", not \"equals\" in the maths sense.",
    },
    { t: "h2", text: "Naming rules and style" },
    {
      t: "list",
      items: [
        "Use letters, digits and underscores. A name can't start with a digit.",
        "Names are case-sensitive: `total` and `Total` are different.",
        "Python style (PEP 8) uses `snake_case`: `monthly_salary`, not `monthlySalary`.",
        "Pick names that say what the value means: `price_eur` beats `x`.",
        "Don't reuse built-in names such as `list`, `str` or `print`.",
      ],
    },
    { t: "h2", text: "Types are worked out for you" },
    {
      t: "code",
      run: true,
      code: 'score = 10\nprint(type(score))\n\nscore = "ten"\nprint(type(score))',
      output: "<class 'int'>\n<class 'str'>",
    },
    {
      t: "p",
      text: "Python is dynamically typed: the value has a type, the name doesn't. That's flexible, but changing what a variable holds halfway through a program makes it harder to read — keep one meaning per name.",
    },
    { t: "h2", text: "Assigning several variables" },
    {
      t: "code",
      run: true,
      code: "x, y = 3, 4\nprint(x, y)\n\nx, y = y, x  # swap without a temporary variable\nprint(x, y)",
      output: "3 4\n4 3",
    },
    { t: "h2", text: "Constants" },
    {
      t: "p",
      text: "Python has no locked constants. By convention, names in `UPPER_CASE` mean \"don't change this\": `VAT_RATE = 0.21`.",
    },
    { t: "h2", text: "Putting variables in text with f-strings" },
    {
      t: "code",
      run: true,
      code: 'name = "Asha"\nage = 30\nprint(f"{name} is {age} years old.")\nprint(f"Next year {name} will be {age + 1}.")',
      output: "Asha is 30 years old.\nNext year Asha will be 31.",
    },
    {
      t: "note",
      tone: "tip",
      title: "Use f-strings",
      text: "Put an `f` before the quotes and write any variable or expression inside `{}`. Older tutorials use `\"%s\" % name` or `.format()` — f-strings are the modern, readable way.",
    },
  ],
  exercise: {
    prompt:
      "Create `city = \"Brussels\"` and `days = 3`, then print exactly: `3 days in Brussels`.",
    starter: "# Create the two variables, then print with an f-string\n",
    expected: "3 days in Brussels",
    hints: [
      "Create both variables first, one per line.",
      "An f-string starts with `f\"` and uses `{}` for variables.",
      'print(f"{days} days in {city}")',
    ],
    solution: 'city = "Brussels"\ndays = 3\nprint(f"{days} days in {city}")',
  },
  quiz: [
    {
      q: "Which name follows Python style?",
      options: ["totalPrice", "total_price", "TotalPrice"],
      answer: 1,
      why: "Python uses `snake_case` for variables and functions.",
    },
    {
      q: "After `a, b = 1, 2` and then `a, b = b, a`, what is `a`?",
      options: ["1", "2", "An error"],
      answer: 1,
      why: "The right side is evaluated first, so the values are swapped: `a` becomes 2.",
    },
    {
      q: 'What does `print(f"{2 * 5} items")` show?',
      options: ["{2 * 5} items", "10 items", "2 * 5 items"],
      answer: 1,
      why: "Expressions inside `{}` in an f-string are calculated.",
    },
  ],
  field: {
    title: "From the field",
    text: "In code reviews, unclear names cause more bugs than clever logic. A variable called `amount` that holds cents in one place and euros in another is a classic source of bugs. Put the unit in the name: `amount_cents`.",
  },
  updated: "2026-11-19",
};

export default lesson;
