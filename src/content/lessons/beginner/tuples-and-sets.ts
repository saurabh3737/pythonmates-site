import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "tuples-and-sets",
  path: "beginner",
  title: "Tuples and sets",
  description:
    "Python tuples and sets: fixed records with tuples and unpacking, unique values with sets, set operations like union and intersection, and when to use each.",
  minutes: 9,
  answer:
    "A tuple is an ordered collection that can't be changed, written with round brackets: `(52.5, 4.3)`. A set is an unordered collection of unique values, written with curly brackets: `{\"a\", \"b\"}`. Use tuples for fixed records and sets to remove duplicates or compare groups.",
  blocks: [
    { t: "h2", text: "Tuples: fixed records" },
    {
      t: "code",
      run: true,
      code: 'point = (3, 4)\nbrussels = ("Brussels", 50.85, 4.35)\nprint(point[0])\nprint(len(brussels))\n\ncity, lat, lon = brussels   # unpacking\nprint(f"{city} is at {lat}, {lon}")',
      output: "3\n3\nBrussels is at 50.85, 4.35",
    },
    {
      t: "p",
      text: "Tuples are perfect when the values belong together and shouldn't change: coordinates, a date, a row from a database. Unpacking gives each value a name in one line.",
    },
    {
      t: "code",
      run: true,
      code: 'point = (3, 4)\ntry:\n    point[0] = 10\nexcept TypeError as err:\n    print("Error:", err)',
      output: "Error: 'tuple' object does not support item assignment",
    },
    {
      t: "note",
      tone: "tip",
      title: "A tuple with one item",
      text: "`(5)` is just the number 5 in brackets. A one-item tuple needs a comma: `(5,)`.",
    },
    { t: "h2", text: "Functions can return tuples" },
    {
      t: "code",
      run: true,
      code: "numbers = [4, 9, 1, 7]\nlowest, highest = min(numbers), max(numbers)\nprint(lowest, highest)\n\nquotient, remainder = divmod(17, 5)\nprint(quotient, remainder)",
      output: "1 9\n3 2",
    },
    { t: "h2", text: "Sets: unique values" },
    {
      t: "code",
      run: true,
      code: 'visits = ["anna", "ben", "anna", "cara", "ben"]\nunique = set(visits)\nprint(len(unique))\nprint(sorted(unique))\n\nunique.add("dev")\nunique.discard("ben")\nprint("ben" in unique)',
      output: "3\n['anna', 'ben', 'cara']\nFalse",
    },
    {
      t: "p",
      text: "Sets have no order and no positions, so `unique[0]` doesn't work. Checking `x in a_set` is very fast, even with millions of items.",
    },
    { t: "h2", text: "Comparing groups" },
    {
      t: "code",
      run: true,
      code: 'python_devs = {"anna", "ben", "cara"}\nai_devs = {"ben", "cara", "dev"}\n\nprint(sorted(python_devs & ai_devs))   # in both\nprint(sorted(python_devs | ai_devs))   # in either\nprint(sorted(python_devs - ai_devs))   # only in the first',
      output: "['ben', 'cara']\n['anna', 'ben', 'cara', 'dev']\n['anna']",
    },
    {
      t: "note",
      tone: "warn",
      title: "{} is an empty dictionary",
      text: "To make an empty set, write `set()`. Empty curly brackets `{}` create a dictionary, which you'll meet in the next lesson.",
    },
    { t: "h2", text: "Which one should I use?" },
    {
      t: "table",
      head: ["Type", "Ordered", "Changeable", "Duplicates", "Typical use"],
      rows: [
        ["list `[]`", "Yes", "Yes", "Yes", "A collection that grows or changes"],
        ["tuple `()`", "Yes", "No", "Yes", "A fixed record, e.g. coordinates"],
        ["set `{}`", "No", "Yes", "No", "Unique values, fast lookups"],
      ],
    },
  ],
  exercise: {
    prompt:
      "Two teams worked on a project. `team_a = [\"ana\", \"raj\", \"li\", \"raj\"]` and `team_b = [\"li\", \"tom\", \"ana\"]`. Print, as sorted lists: everyone who worked on it (no duplicates), then the people in both teams.",
    starter: 'team_a = ["ana", "raj", "li", "raj"]\nteam_b = ["li", "tom", "ana"]\n',
    expected: "['ana', 'li', 'raj', 'tom']\n['ana', 'li']",
    hints: [
      "Turn each list into a set with `set()`.",
      "`|` gives everyone, `&` gives the people in both. Wrap the result in `sorted()`.",
      "a, b = set(team_a), set(team_b) then print(sorted(a | b)) and print(sorted(a & b))",
    ],
    solution:
      'team_a = ["ana", "raj", "li", "raj"]\nteam_b = ["li", "tom", "ana"]\na, b = set(team_a), set(team_b)\nprint(sorted(a | b))\nprint(sorted(a & b))',
  },
  quiz: [
    {
      q: "What does `len({1, 1, 2, 2, 3})` give?",
      options: ["5", "3", "An error"],
      answer: 1,
      why: "A set keeps each value once: `{1, 2, 3}`.",
    },
    {
      q: "Which creates an empty set?",
      options: ["{}", "set()", "()"],
      answer: 1,
      why: "`{}` is an empty dictionary and `()` is an empty tuple.",
    },
    {
      q: "Why choose a tuple over a list?",
      options: ["It's faster to add items", "The values shouldn't change", "It removes duplicates"],
      answer: 1,
      why: "Tuples can't be changed, which protects fixed records from accidental edits.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
