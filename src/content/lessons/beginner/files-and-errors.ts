import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "files-and-errors",
  path: "beginner",
  title: "Files and errors",
  description:
    "Read and write text files in Python with open() and pathlib, handle CSV data, and deal with errors using try, except, else, finally and raise.",
  minutes: 13,
  answer:
    "Use `with open(\"file.txt\") as f:` to read or write a file — `with` closes it for you, even if something goes wrong. Wrap code that can fail in `try` / `except` to handle the error instead of crashing, and use `raise` to report a problem yourself.",
  blocks: [
    { t: "h2", text: "Writing and reading a text file" },
    {
      t: "code",
      run: true,
      code: 'with open("notes.txt", "w", encoding="utf-8") as f:\n    f.write("first line\\n")\n    f.write("second line\\n")\n\nwith open("notes.txt", encoding="utf-8") as f:\n    content = f.read()\nprint(content)',
      output: "first line\nsecond line\n",
    },
    {
      t: "table",
      head: ["Mode", "Meaning"],
      rows: [
        ["`\"r\"`", "read (the default)"],
        ["`\"w\"`", "write — creates the file or empties an existing one"],
        ["`\"a\"`", "append to the end"],
      ],
    },
    {
      t: "note",
      tone: "tip",
      title: "Always pass encoding",
      text: "`encoding=\"utf-8\"` makes your code behave the same on Windows, macOS and Linux, including accents and emoji.",
    },
    { t: "h2", text: "Reading line by line" },
    {
      t: "code",
      run: true,
      code: 'with open("todo.txt", "w", encoding="utf-8") as f:\n    f.write("buy milk\\ncall Ana\\nfix bug\\n")\n\nwith open("todo.txt", encoding="utf-8") as f:\n    for number, line in enumerate(f, start=1):\n        print(number, line.strip())',
      output: "1 buy milk\n2 call Ana\n3 fix bug",
    },
    { t: "h2", text: "pathlib: the modern way" },
    {
      t: "code",
      run: true,
      code: 'from pathlib import Path\n\npath = Path("hello.txt")\npath.write_text("Hi from pathlib\\n", encoding="utf-8")\nprint(path.read_text(encoding="utf-8").strip())\nprint(path.exists(), path.suffix, path.stem)',
      output: "Hi from pathlib\nTrue .txt hello",
    },
    { t: "h2", text: "CSV files" },
    {
      t: "code",
      run: true,
      code: 'import csv\n\nwith open("sales.csv", "w", newline="", encoding="utf-8") as f:\n    f.write("product,qty\\nmug,3\\ntea,5\\n")\n\nwith open("sales.csv", newline="", encoding="utf-8") as f:\n    rows = list(csv.DictReader(f))\nprint(rows[0])\nprint(sum(int(r["qty"]) for r in rows))',
      output: "{'product': 'mug', 'qty': '3'}\n8",
    },
    {
      t: "p",
      text: "`csv.DictReader` turns each row into a dictionary using the header line. Values arrive as text, so convert numbers with `int()` or `float()`.",
    },
    { t: "h2", text: "Handling errors with try and except" },
    {
      t: "code",
      run: true,
      code: 'for text in ["42", "4.2", "abc"]:\n    try:\n        number = int(text)\n    except ValueError:\n        print(f"{text!r} is not a whole number")\n    else:\n        print(f"Got {number}")',
      output: "Got 42\n'4.2' is not a whole number\n'abc' is not a whole number",
    },
    {
      t: "list",
      items: [
        "`try` holds the code that might fail.",
        "`except SomeError` runs only if that error happens. Catch specific errors, not everything.",
        "`else` runs when no error happened; `finally` always runs, for clean-up.",
      ],
    },
    {
      t: "code",
      run: true,
      code: 'try:\n    with open("missing.txt", encoding="utf-8") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print("File not found — using defaults")\nfinally:\n    print("Done")',
      output: "File not found — using defaults\nDone",
    },
    { t: "h2", text: "Raising your own errors" },
    {
      t: "code",
      run: true,
      code: 'def set_age(age: int) -> int:\n    if age < 0:\n        raise ValueError("age can\'t be negative")\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as err:\n    print("Problem:", err)',
      output: "Problem: age can't be negative",
    },
    {
      t: "note",
      tone: "warn",
      title: "Don't hide errors",
      text: "A bare `except:` that does nothing swallows every problem, including typos in your own code. Catch the specific error you expect and let the rest surface.",
    },
  ],
  exercise: {
    prompt:
      "Add up the valid numbers in `values = [\"10\", \"x\", \"5\", \"\", \"7\"]`. Use `try` / `except ValueError` to skip anything that isn't a whole number. Print the total, then on a second line how many values were skipped.",
    starter: 'values = ["10", "x", "5", "", "7"]\ntotal = 0\nskipped = 0\n# loop, convert with int(), handle ValueError\n',
    expected: "22\n2",
    hints: [
      "Loop over `values` and put `total += int(v)` inside a `try` block.",
      "In `except ValueError:` add 1 to `skipped`.",
      "After the loop, print(total) and print(skipped).",
    ],
    solution:
      'values = ["10", "x", "5", "", "7"]\ntotal = 0\nskipped = 0\nfor v in values:\n    try:\n        total += int(v)\n    except ValueError:\n        skipped += 1\nprint(total)\nprint(skipped)',
  },
  quiz: [
    {
      q: "Why use `with open(...) as f:`?",
      options: ["It reads faster", "It closes the file automatically", "It's required for text files"],
      answer: 1,
      why: "`with` closes the file when the block ends, even after an error.",
    },
    {
      q: "What does mode `\"w\"` do to an existing file?",
      options: ["Adds to the end", "Empties it first", "Raises an error"],
      answer: 1,
      why: "`\"w\"` overwrites. Use `\"a\"` to append.",
    },
    {
      q: "When does an `else` block after `try`/`except` run?",
      options: ["Always", "Only if no error happened", "Only if an error happened"],
      answer: 1,
      why: "`else` runs when the `try` block finished without an error; `finally` always runs.",
    },
  ],
  field: {
    title: "From the field",
    text: "Real input is messy: empty cells, \"N/A\", a stray space. Robust scripts validate each record, log or count what they skip, and keep going — exactly the pattern in this exercise.",
  },
  updated: "2026-11-19",
};

export default lesson;
