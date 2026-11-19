import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "conditions",
  path: "beginner",
  title: "Conditions",
  description:
    "Python if, elif and else: comparisons, and/or/not, truthy and falsy values, one-line conditional expressions and pattern matching with match-case.",
  minutes: 11,
  answer:
    "`if` runs a block of code only when a condition is `True`; `elif` checks another condition and `else` catches everything left. Conditions use comparisons such as `==`, `<` and `in`, combined with `and`, `or` and `not`. Python uses indentation, not brackets, to mark each block.",
  blocks: [
    { t: "h2", text: "if, elif and else" },
    {
      t: "code",
      run: true,
      code: 'temperature = 18\n\nif temperature > 25:\n    print("Hot — shorts weather")\nelif temperature > 15:\n    print("Mild — bring a light jacket")\nelse:\n    print("Cold — wear a coat")',
      output: "Mild — bring a light jacket",
    },
    {
      t: "list",
      items: [
        "End each condition line with a colon `:`.",
        "Indent the block underneath by 4 spaces. The indentation is the block.",
        "Python checks from the top and runs only the first branch that's true.",
      ],
    },
    { t: "h2", text: "Comparison operators" },
    {
      t: "table",
      head: ["Operator", "Meaning", "Example"],
      rows: [
        ["`==`", "equal", "`age == 18`"],
        ["`!=`", "not equal", "`status != \"done\"`"],
        ["`<` `<=`", "less (or equal)", "`price < 10`"],
        ["`>` `>=`", "greater (or equal)", "`score >= 50`"],
        ["`in`", "is inside", "`\"@\" in email`"],
        ["`is`", "is the same object (use for `None`)", "`result is None`"],
      ],
    },
    {
      t: "note",
      tone: "warn",
      title: "= is not ==",
      text: "`=` assigns a value; `==` compares. Writing `if age = 18:` is a syntax error.",
    },
    { t: "h2", text: "Combining conditions" },
    {
      t: "code",
      run: true,
      code: 'age = 34\nhas_ticket = True\n\nif age >= 18 and has_ticket:\n    print("Welcome in")\n\nif not has_ticket or age < 18:\n    print("Sorry")\nelse:\n    print("Enjoy the show")\n\nprint(18 <= age < 65)   # chained comparison',
      output: "Welcome in\nEnjoy the show\nTrue",
    },
    { t: "h2", text: "Truthy and falsy values" },
    {
      t: "code",
      run: true,
      code: 'for value in [0, 7, "", "hi", [], [1], None]:\n    print(repr(value), bool(value))',
      output: "0 False\n7 True\n'' False\n'hi' True\n[] False\n[1] True\nNone False",
    },
    {
      t: "p",
      text: "Empty things and zero count as false, so you can write `if items:` instead of `if len(items) > 0:`.",
    },
    { t: "h2", text: "One-line conditional expression" },
    {
      t: "code",
      run: true,
      code: 'stock = 0\nlabel = "in stock" if stock > 0 else "sold out"\nprint(label)',
      output: "sold out",
    },
    { t: "h2", text: "match-case: choosing between many patterns" },
    {
      t: "code",
      run: true,
      code: 'def describe(command: str) -> str:\n    match command.split():\n        case ["go", direction]:\n            return f"Walking {direction}"\n        case ["pick", "up", item]:\n            return f"You take the {item}"\n        case ["quit" | "exit"]:\n            return "Bye!"\n        case _:\n            return "I don\'t understand"\n\nprint(describe("go north"))\nprint(describe("pick up lamp"))\nprint(describe("exit"))\nprint(describe("dance"))',
      output: "Walking north\nYou take the lamp\nBye!\nI don't understand",
    },
    {
      t: "p",
      text: "`match` (Python 3.10+) compares a value against shapes, not just single values, and can pull parts out into names. `case _` catches everything else. For simple yes/no choices, `if` is still clearer.",
    },
  ],
  exercise: {
    prompt:
      "Write grades for these scores: `scores = [92, 75, 58, 81]`. Print one line per score: `A` for 90 and above, `B` for 75–89, `C` for 60–74 and `F` below 60, formatted like `92: A`.",
    starter: "scores = [92, 75, 58, 81]\nfor score in scores:\n    # decide the grade, then print it\n    pass\n",
    expected: "92: A\n75: B\n58: F\n81: B",
    hints: [
      "Check from the highest grade down: `if score >= 90`, then `elif score >= 75`, and so on.",
      "Store the letter in a variable like `grade`, then print once at the end of the loop body.",
      'print(f"{score}: {grade}") inside the loop, after the if/elif/else.',
    ],
    solution:
      'scores = [92, 75, 58, 81]\nfor score in scores:\n    if score >= 90:\n        grade = "A"\n    elif score >= 75:\n        grade = "B"\n    elif score >= 60:\n        grade = "C"\n    else:\n        grade = "F"\n    print(f"{score}: {grade}")',
  },
  quiz: [
    {
      q: "What does `bool([])` give?",
      options: ["True", "False", "An error"],
      answer: 1,
      why: "Empty collections are falsy.",
    },
    {
      q: "With `x = 7`, which branch runs: `if x > 5: A`, `elif x > 3: B`?",
      options: ["A only", "B only", "A and B"],
      answer: 0,
      why: "Python runs only the first true branch and skips the rest.",
    },
    {
      q: "How should you check whether a value is `None`?",
      options: ["`value == None`", "`value is None`", "`value = None`"],
      answer: 1,
      why: "`is None` is the recommended, unambiguous check.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
