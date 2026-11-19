import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "loops",
  path: "beginner",
  title: "Loops",
  description:
    "Python for and while loops: looping over lists and strings, range(), enumerate() and zip(), break and continue, and how to avoid infinite loops.",
  minutes: 12,
  answer:
    "A `for` loop repeats code once for each item in a collection: `for name in names:`. A `while` loop repeats as long as a condition stays true. Use `range()` for counting, `enumerate()` when you also need the position, `zip()` to walk two lists together, and `break` or `continue` to leave or skip.",
  blocks: [
    { t: "h2", text: "for loops" },
    {
      t: "code",
      run: true,
      code: 'cities = ["Pune", "Bangalore", "Brussels"]\nfor city in cities:\n    print(f"Hello, {city}!")\n\nfor letter in "Py":\n    print(letter)',
      output: "Hello, Pune!\nHello, Bangalore!\nHello, Brussels!\nP\ny",
    },
    { t: "h2", text: "Counting with range()" },
    {
      t: "code",
      run: true,
      code: "print(list(range(5)))\nprint(list(range(2, 6)))\nprint(list(range(10, 0, -3)))\n\ntotal = 0\nfor n in range(1, 101):\n    total += n\nprint(total)",
      output: "[0, 1, 2, 3, 4]\n[2, 3, 4, 5]\n[10, 7, 4, 1]\n5050",
    },
    {
      t: "p",
      text: "`range(stop)` counts from 0 up to, but not including, `stop`. `range(start, stop, step)` gives full control.",
    },
    { t: "h2", text: "enumerate() and zip()" },
    {
      t: "code",
      run: true,
      code: 'tasks = ["plan", "build", "test"]\nfor number, task in enumerate(tasks, start=1):\n    print(number, task)\n\nnames = ["Ana", "Ben", "Cara"]\nscores = [88, 92, 79]\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")',
      output: "1 plan\n2 build\n3 test\nAna: 88\nBen: 92\nCara: 79",
    },
    {
      t: "note",
      tone: "tip",
      title: "Skip range(len(...))",
      text: "Older tutorials write `for i in range(len(items)):` and then `items[i]`. `enumerate()` gives you both the position and the item, and is easier to read.",
    },
    { t: "h2", text: "while loops" },
    {
      t: "code",
      run: true,
      code: 'balance = 1000\nyears = 0\nwhile balance < 1500:\n    balance *= 1.05\n    years += 1\nprint(f"{years} years: {balance:.2f}")',
      output: "9 years: 1551.33",
    },
    {
      t: "p",
      text: "Use `while` when you don't know in advance how many repeats you need. Make sure something inside the loop eventually makes the condition false.",
    },
    {
      t: "note",
      tone: "warn",
      title: "Infinite loops",
      text: "If the condition never becomes false, the loop runs forever. Here in the browser, Run stops after 10 seconds; on your computer press `Ctrl+C`.",
    },
    { t: "h2", text: "break and continue" },
    {
      t: "code",
      run: true,
      code: 'numbers = [4, 7, -1, 9, 12]\nfor n in numbers:\n    if n < 0:\n        print("Negative found, stopping")\n        break\n    print(n)\n\nfor n in range(1, 8):\n    if n % 2 == 0:\n        continue   # skip even numbers\n    print(n, end=" ")\nprint()',
      output: "4\n7\nNegative found, stopping\n1 3 5 7 ",
    },
    { t: "h2", text: "Loops inside loops" },
    {
      t: "code",
      run: true,
      code: 'for row in range(1, 4):\n    line = ""\n    for col in range(1, 4):\n        line += f"{row * col:4}"\n    print(line)',
      output: "   1   2   3\n   2   4   6\n   3   6   9",
    },
  ],
  exercise: {
    prompt:
      "Classic FizzBuzz: for the numbers 1 to 15, print `FizzBuzz` if the number divides by both 3 and 5, `Fizz` if it divides by 3, `Buzz` if it divides by 5, and otherwise the number itself — one per line.",
    starter: "for n in range(1, 16):\n    # your if / elif / else here\n    pass\n",
    expected: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    hints: [
      "`n % 3 == 0` means `n` divides by 3.",
      "Check the \"both\" case first (`n % 15 == 0`), otherwise 15 would print `Fizz`.",
      'if n % 15 == 0: print("FizzBuzz") elif n % 3 == 0: print("Fizz") elif n % 5 == 0: print("Buzz") else: print(n)',
    ],
    solution:
      'for n in range(1, 16):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)',
  },
  quiz: [
    {
      q: "What does `list(range(3))` give?",
      options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]"],
      answer: 1,
      why: "`range(3)` starts at 0 and stops before 3.",
    },
    {
      q: "What does `continue` do?",
      options: ["Ends the loop", "Skips to the next round of the loop", "Pauses the program"],
      answer: 1,
      why: "`continue` skips the rest of the current round; `break` ends the loop.",
    },
    {
      q: "Best way to get each item and its position?",
      options: ["`range(len(items))`", "`enumerate(items)`", "`zip(items)`"],
      answer: 1,
      why: "`enumerate()` gives `(position, item)` pairs.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
