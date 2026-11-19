import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "first-program",
  path: "beginner",
  title: "Your first program",
  description:
    "Write and run your first Python program: print(), comments, running a .py file, the interactive shell and reading your first error message.",
  minutes: 8,
  answer:
    "A Python program is a text file ending in `.py` that Python runs from top to bottom, one line at a time. The `print()` function shows output, `#` starts a comment that Python ignores, and you run a file with `python hello.py`.",
  blocks: [
    { t: "h2", text: "print() shows output" },
    {
      t: "code",
      run: true,
      code: 'print("Hello, world!")\nprint("Python runs", "line by line")\nprint()\nprint("The empty print() above made a blank line")',
      output:
        "Hello, world!\nPython runs line by line\n\nThe empty print() above made a blank line",
    },
    {
      t: "p",
      text: "Give `print()` several values separated by commas and it puts a space between them. Text in quotes is called a string — you'll learn more about strings soon.",
    },
    { t: "h2", text: "Comments" },
    {
      t: "p",
      text: "Anything after `#` on a line is a comment. Python skips it. Use comments to explain why the code does something, not what every line does.",
    },
    {
      t: "code",
      run: true,
      code: '# Greet the user\nprint("Welcome!")  # comments can also follow code',
      output: "Welcome!",
    },
    { t: "h2", text: "Running a .py file" },
    {
      t: "list",
      items: [
        "Create a file called `hello.py` in any editor — VS Code and PyCharm are popular and free.",
        "Write `print(\"Hello, world!\")` in it and save.",
        "Open a terminal in the same folder and run `python hello.py` (or `python3 hello.py`).",
      ],
    },
    { t: "h2", text: "The interactive shell" },
    {
      t: "p",
      text: "Type `python` on its own to open the interactive shell, shown by `>>>`. It runs each line as soon as you press Enter — perfect for quick experiments. Type `exit()` to leave.",
    },
    {
      t: "code",
      file: "terminal",
      code: ">>> 10 * 3\n30\n>>> print(\"hi\")\nhi",
    },
    { t: "h2", text: "Your first error" },
    {
      t: "p",
      text: "Errors are normal — every programmer sees them all day. Run this and read the last line of the message.",
    },
    {
      t: "code",
      run: true,
      code: 'print("Missing a closing bracket"',
    },
    {
      t: "note",
      tone: "tip",
      title: "Read errors from the bottom",
      text: "The last line names the problem (here a `SyntaxError`) and the lines above point to where it happened. Modern Python versions add hints like \"'(' was never closed\".",
    },
  ],
  exercise: {
    prompt:
      "Print a three-line greeting card: `Happy birthday!`, then an empty line, then `From Python`.",
    starter: "# Three print() calls\n",
    expected: "Happy birthday!\n\nFrom Python",
    hints: [
      "You need three separate `print()` calls.",
      "An empty `print()` prints a blank line.",
      'print("Happy birthday!") then print() then print("From Python").',
    ],
    solution: 'print("Happy birthday!")\nprint()\nprint("From Python")',
  },
  quiz: [
    {
      q: "What does Python do with a line that starts with `#`?",
      options: ["Prints it", "Ignores it", "Raises an error"],
      answer: 1,
      why: "Lines starting with `#` are comments — notes for humans.",
    },
    {
      q: 'What does `print("a", "b")` show?',
      options: ["ab", "a b", '"a", "b"'],
      answer: 1,
      why: "Values separated by commas are printed with a space between them.",
    },
    {
      q: "Where should you look first in an error message?",
      options: ["The first line", "The last line", "It doesn't matter"],
      answer: 1,
      why: "The last line tells you the type of error and what went wrong.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
