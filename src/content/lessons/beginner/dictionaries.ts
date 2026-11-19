import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "dictionaries",
  path: "beginner",
  title: "Dictionaries",
  description:
    "Python dictionaries: key-value pairs, reading safely with get(), adding and updating, looping with items(), counting with a dictionary and nested data like JSON.",
  minutes: 11,
  answer:
    "A dictionary (`dict`) stores key-value pairs, like `{\"name\": \"Asha\", \"age\": 30}`. You look values up by key (`person[\"name\"]`), use `.get()` when a key might be missing, and loop over pairs with `.items()`. Dictionaries are how Python represents most real-world data, including JSON.",
  blocks: [
    { t: "h2", text: "Creating and reading" },
    {
      t: "code",
      run: true,
      code: 'person = {"name": "Asha", "city": "Pune", "age": 30}\nprint(person["name"])\nprint(len(person))\nprint("city" in person)',
      output: "Asha\n3\nTrue",
    },
    {
      t: "p",
      text: "Keys are usually strings, and each key appears only once. Values can be anything: numbers, lists, even other dictionaries.",
    },
    { t: "h2", text: "Missing keys and .get()" },
    {
      t: "code",
      run: true,
      code: 'person = {"name": "Asha"}\nprint(person.get("email"))\nprint(person.get("email", "not given"))\n\ntry:\n    print(person["email"])\nexcept KeyError as err:\n    print("KeyError:", err)',
      output: "None\nnot given\nKeyError: 'email'",
    },
    { t: "h2", text: "Adding, changing and removing" },
    {
      t: "code",
      run: true,
      code: 'stock = {"apples": 10}\nstock["pears"] = 4          # add\nstock["apples"] -= 3        # change\nstock.update({"kiwis": 6, "pears": 5})\nremoved = stock.pop("kiwis")\nprint(stock)\nprint(removed)',
      output: "{'apples': 7, 'pears': 5}\n6",
    },
    { t: "h2", text: "Looping over a dictionary" },
    {
      t: "code",
      run: true,
      code: 'prices = {"coffee": 3.2, "tea": 2.5, "cake": 4.0}\nfor item, price in prices.items():\n    print(f"{item:<8}{price:>6.2f}")\n\nprint(list(prices.keys()))\nprint(sum(prices.values()))',
      output: "coffee    3.20\ntea       2.50\ncake      4.00\n['coffee', 'tea', 'cake']\n9.7",
    },
    {
      t: "p",
      text: "Dictionaries remember the order you inserted keys in, so loops always run in that order.",
    },
    { t: "h2", text: "Counting things" },
    {
      t: "code",
      run: true,
      code: 'words = "the cat and the hat and the bat".split()\ncounts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)\n\nfrom collections import Counter\nprint(Counter(words).most_common(2))',
      output: "{'the': 3, 'cat': 1, 'and': 2, 'hat': 1, 'bat': 1}\n[('the', 3), ('and', 2)]",
    },
    {
      t: "note",
      tone: "tip",
      title: "Counter does it for you",
      text: "The pattern `counts.get(word, 0) + 1` is worth knowing, but in real code `collections.Counter` counts in one line.",
    },
    { t: "h2", text: "Nested data, just like JSON" },
    {
      t: "code",
      run: true,
      code: 'order = {\n    "id": 1042,\n    "customer": {"name": "Ben", "country": "BE"},\n    "items": [\n        {"product": "mug", "qty": 2},\n        {"product": "tea", "qty": 1},\n    ],\n}\nprint(order["customer"]["name"])\nprint(order["items"][0]["product"])\nprint(sum(i["qty"] for i in order["items"]))',
      output: "Ben\nmug\n3",
    },
    {
      t: "p",
      text: "API responses and config files almost always look like this. Read them by chaining keys and positions from the outside in.",
    },
  ],
  exercise: {
    prompt:
      "Count the votes in `votes = [\"python\", \"rust\", \"python\", \"go\", \"python\", \"go\"]` with a dictionary, then print each language and its count on its own line, like `python: 3`, in the order they first appear.",
    starter: 'votes = ["python", "rust", "python", "go", "python", "go"]\ncounts = {}\n# count, then print\n',
    expected: "python: 3\nrust: 1\ngo: 2",
    hints: [
      "Loop over `votes` and add 1 to `counts[vote]` each time.",
      "`counts.get(vote, 0) + 1` works even the first time a language appears.",
      'Then: for lang, n in counts.items(): print(f"{lang}: {n}")',
    ],
    solution:
      'votes = ["python", "rust", "python", "go", "python", "go"]\ncounts = {}\nfor vote in votes:\n    counts[vote] = counts.get(vote, 0) + 1\nfor lang, n in counts.items():\n    print(f"{lang}: {n}")',
  },
  quiz: [
    {
      q: 'What does `{"a": 1}.get("b", 0)` return?',
      options: ["None", "0", "A KeyError"],
      answer: 1,
      why: "`.get()` returns the default you give when the key is missing.",
    },
    {
      q: "What do you loop over to get keys and values together?",
      options: [".keys()", ".items()", ".values()"],
      answer: 1,
      why: "`.items()` gives `(key, value)` pairs.",
    },
    {
      q: 'After `d = {"x": 1}` and `d["x"] = 5`, how many keys does `d` have?',
      options: ["1", "2", "An error"],
      answer: 0,
      why: "Assigning to an existing key replaces its value; keys are unique.",
    },
  ],
  field: {
    title: "From the field",
    text: "Most production crashes in data pipelines are a `KeyError` on a field that \"is always there\" — until one record doesn't have it. Use `.get()` with a sensible default for anything that comes from outside your program.",
  },
  updated: "2026-11-19",
};

export default lesson;
