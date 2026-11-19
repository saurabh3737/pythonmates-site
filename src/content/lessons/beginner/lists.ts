import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "lists",
  path: "beginner",
  title: "Lists",
  description:
    "Python lists: creating, indexing and slicing, adding and removing items, sorting, checking membership, nested lists and the copy trap every beginner meets.",
  minutes: 11,
  answer:
    "A list is an ordered, changeable collection written with square brackets, like `[3, 1, 2]`. You read items by position (`items[0]`), add with `.append()`, remove with `.remove()` or `.pop()`, and sort with `.sort()` or `sorted()`. Lists can hold any type, even other lists.",
  blocks: [
    { t: "h2", text: "Creating and reading lists" },
    {
      t: "code",
      run: true,
      code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits)\nprint(fruits[0])\nprint(fruits[-1])\nprint(fruits[1:])\nprint(len(fruits))',
      output: "['apple', 'banana', 'cherry']\napple\ncherry\n['banana', 'cherry']\n3",
    },
    {
      t: "p",
      text: "Indexing and slicing work exactly like strings: positions start at 0, and negative positions count from the end.",
    },
    { t: "h2", text: "Changing a list" },
    {
      t: "code",
      run: true,
      code: 'tasks = ["email", "report"]\ntasks.append("meeting")       # add to the end\ntasks.insert(0, "coffee")      # add at a position\ntasks.extend(["gym", "read"])  # add several\nprint(tasks)\n\ntasks.remove("gym")            # remove by value\nlast = tasks.pop()             # remove and return the last item\nprint(last)\ntasks[1] = "inbox zero"        # replace by position\nprint(tasks)',
      output:
        "['coffee', 'email', 'report', 'meeting', 'gym', 'read']\nread\n['coffee', 'inbox zero', 'report', 'meeting']",
    },
    { t: "h2", text: "Sorting" },
    {
      t: "code",
      run: true,
      code: 'scores = [72, 95, 58, 88]\nprint(sorted(scores))           # new sorted list\nprint(scores)                   # original unchanged\n\nscores.sort(reverse=True)       # sorts in place\nprint(scores)\n\nnames = ["bob", "Alice", "carol"]\nprint(sorted(names, key=str.lower))',
      output: "[58, 72, 88, 95]\n[72, 95, 58, 88]\n[95, 88, 72, 58]\n['Alice', 'bob', 'carol']",
    },
    {
      t: "note",
      tone: "tip",
      title: "sorted() or .sort()?",
      text: "`sorted(x)` returns a new list and keeps the original. `x.sort()` changes the list itself and returns `None` — so never write `x = x.sort()`.",
    },
    { t: "h2", text: "Useful checks and totals" },
    {
      t: "code",
      run: true,
      code: 'prices = [4.5, 12.0, 3.25]\nprint(12.0 in prices)\nprint(sum(prices), min(prices), max(prices))\nprint(prices.index(3.25))\nprint(["a", "b", "a"].count("a"))',
      output: "True\n19.75 3.25 12.0\n2\n2",
    },
    { t: "h2", text: "Lists inside lists" },
    {
      t: "code",
      run: true,
      code: "grid = [\n    [1, 2, 3],\n    [4, 5, 6],\n]\nprint(grid[1][2])\nprint(len(grid), len(grid[0]))",
      output: "6\n2 3",
    },
    { t: "h2", text: "The copy trap" },
    {
      t: "code",
      run: true,
      code: 'a = [1, 2, 3]\nb = a          # NOT a copy: both names point to the same list\nb.append(4)\nprint(a)\n\nc = a.copy()   # a real copy (a[:] also works)\nc.append(5)\nprint(a)\nprint(c)',
      output: "[1, 2, 3, 4]\n[1, 2, 3, 4]\n[1, 2, 3, 4, 5]",
    },
    {
      t: "note",
      tone: "warn",
      title: "= never copies",
      text: "Assigning a list to a new name gives the same list a second name. Use `.copy()` when you want an independent list.",
    },
  ],
  exercise: {
    prompt:
      "Start with `cart = [\"milk\", \"bread\"]`. Add `\"eggs\"` at the end, put `\"coffee\"` at the front, remove `\"bread\"`, then print the cart sorted alphabetically and, on a second line, how many items it has.",
    starter: 'cart = ["milk", "bread"]\n# change the cart, then print sorted(cart) and len(cart)\n',
    expected: "['coffee', 'eggs', 'milk']\n3",
    hints: [
      "Use `.append()`, `.insert(0, ...)` and `.remove()`.",
      "`sorted(cart)` gives an alphabetical copy; `len(cart)` gives the count.",
      'cart.append("eggs"), cart.insert(0, "coffee"), cart.remove("bread"), then print both.',
    ],
    solution:
      'cart = ["milk", "bread"]\ncart.append("eggs")\ncart.insert(0, "coffee")\ncart.remove("bread")\nprint(sorted(cart))\nprint(len(cart))',
  },
  quiz: [
    {
      q: "What is `[10, 20, 30][-1]`?",
      options: ["10", "30", "An error"],
      answer: 1,
      why: "`-1` is the last item.",
    },
    {
      q: "What does `x = [3, 1, 2].sort()` store in `x`?",
      options: ["[1, 2, 3]", "None", "[3, 1, 2]"],
      answer: 1,
      why: "`.sort()` sorts in place and returns `None`. Use `sorted()` to get a new list.",
    },
    {
      q: "After `a = [1]`, `b = a`, `b.append(2)`, what is `a`?",
      options: ["[1]", "[1, 2]", "[2]"],
      answer: 1,
      why: "`a` and `b` are the same list, so changing one changes the other.",
    },
  ],
  field: {
    title: "From the field",
    text: "The `b = a` trap is one of the most common bugs in data scripts: a function quietly changes a list that the caller still uses. When a function shouldn't change its input, work on a copy.",
  },
  updated: "2026-11-19",
};

export default lesson;
