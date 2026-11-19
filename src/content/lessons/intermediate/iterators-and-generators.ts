import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "iterators-and-generators",
  path: "intermediate",
  title: "Iterators and generators",
  description:
    "How Python for loops really work: iterables and iterators, iter() and next(), generator functions with yield, lazy pipelines, and itertools for real tasks.",
  minutes: 12,
  answer:
    "An iterator hands out values one at a time with `next()` until it raises `StopIteration`; every `for` loop uses one behind the scenes. A generator is the easy way to write your own iterator: a function that uses `yield` instead of `return`. Generators are lazy, so they can process huge files or endless streams with almost no memory.",
  blocks: [
    { t: "h2", text: "What a for loop really does" },
    {
      t: "code",
      run: true,
      code: 'colours = ["red", "green"]\nit = iter(colours)\nprint(next(it))\nprint(next(it))\ntry:\n    next(it)\nexcept StopIteration:\n    print("No more items")',
      output: "red\ngreen\nNo more items",
    },
    {
      t: "p",
      text: "A list is iterable: `iter()` can make an iterator from it. `for colour in colours` calls `iter()` once, then `next()` until `StopIteration`. Strings, dicts, files and ranges all work the same way.",
    },
    { t: "h2", text: "Generator functions" },
    {
      t: "code",
      run: true,
      code: 'def countdown(start: int):\n    print("Starting")\n    while start > 0:\n        yield start\n        start -= 1\n    print("Lift-off!")\n\nfor n in countdown(3):\n    print(n)',
      output: "Starting\n3\n2\n1\nLift-off!",
    },
    {
      t: "list",
      items: [
        "Calling `countdown(3)` runs nothing yet — it returns a generator object.",
        "Each `next()` runs the function until the next `yield`, then pauses there.",
        "When the function ends, the generator raises `StopIteration` for you.",
      ],
    },
    { t: "h2", text: "Lazy means memory-friendly" },
    {
      t: "code",
      run: true,
      code: 'import sys\n\nsquares_list = [n * n for n in range(1_000_000)]\nsquares_gen = (n * n for n in range(1_000_000))\nprint(sys.getsizeof(squares_list) > 1_000_000)\nprint(sys.getsizeof(squares_gen) < 1_000)\nprint(sum(squares_gen))',
      output: "True\nTrue\n333332833333500000",
    },
    {
      t: "note",
      tone: "warn",
      title: "Generators run once",
      text: "After a generator is used up, it stays empty. If you need the values twice, store them in a list or create a new generator.",
    },
    { t: "h2", text: "Pipelines of generators" },
    {
      t: "code",
      run: true,
      code: 'log_lines = [\n    "INFO start",\n    "ERROR disk full",\n    "INFO retry",\n    "ERROR timeout",\n]\n\ndef errors(lines):\n    for line in lines:\n        if line.startswith("ERROR"):\n            yield line\n\ndef messages(lines):\n    for line in lines:\n        yield line.split(" ", 1)[1]\n\nfor msg in messages(errors(log_lines)):\n    print(msg)',
      output: "disk full\ntimeout",
    },
    {
      t: "p",
      text: "Each stage handles one line at a time, so this works the same for 4 lines or a 40 GB log file read with `open()`.",
    },
    { t: "h2", text: "Infinite generators and itertools" },
    {
      t: "code",
      run: true,
      code: 'import itertools\n\ndef ids(prefix: str):\n    n = 1\n    while True:\n        yield f"{prefix}-{n:03}"\n        n += 1\n\nprint(list(itertools.islice(ids("ORD"), 3)))\n\nfor size, colour in itertools.product(["S", "M"], ["red", "blue"]):\n    print(size, colour)\n\nprint(list(itertools.batched(range(7), 3)))',
      output: "['ORD-001', 'ORD-002', 'ORD-003']\nS red\nS blue\nM red\nM blue\n[(0, 1, 2), (3, 4, 5), (6,)]",
    },
    {
      t: "p",
      text: "`islice` takes the first few values from any iterator, `product` builds every combination, and `batched` (Python 3.12+) splits data into chunks — handy for sending records to an API in groups.",
    },
  ],
  exercise: {
    prompt:
      "Write a generator `evens(limit)` that yields the even numbers from 0 up to and including `limit`. Print `list(evens(10))`, then the sum of `evens(100)`.",
    starter: "def evens(limit: int):\n    ...\n\n",
    expected: "[0, 2, 4, 6, 8, 10]\n2550",
    hints: [
      "Loop over `range(0, limit + 1, 2)`.",
      "Inside the loop, `yield` each number.",
      "def evens(limit): for n in range(0, limit + 1, 2): yield n",
    ],
    solution:
      "def evens(limit: int):\n    for n in range(0, limit + 1, 2):\n        yield n\n\nprint(list(evens(10)))\nprint(sum(evens(100)))",
  },
  quiz: [
    {
      q: "What does calling a generator function return?",
      options: ["The first value", "A generator object", "A list"],
      answer: 1,
      why: "The body only runs when you ask for values with `next()` or a loop.",
    },
    {
      q: "What happens if you loop over the same generator twice?",
      options: ["You get the values again", "The second loop gets nothing", "An error"],
      answer: 1,
      why: "Generators are used up after one pass.",
    },
    {
      q: "Why use a generator for a huge file?",
      options: ["It's always faster", "It keeps only one item in memory at a time", "Files require generators"],
      answer: 1,
      why: "Lazy processing keeps memory use flat however big the input is.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
