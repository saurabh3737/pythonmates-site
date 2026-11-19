import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "modules-and-packages",
  path: "intermediate",
  title: "Modules, packages and environments",
  description:
    "Python modules and packages: import styles, writing your own module, __name__ == \"__main__\", packages with __init__.py, virtual environments, pip, uv and pyproject.toml.",
  minutes: 13,
  answer:
    "A module is any `.py` file; a package is a folder of modules. You reuse code with `import`. Third-party packages are installed from PyPI into a virtual environment — a private folder of packages for one project — with `pip` or the faster `uv`, and listed in `pyproject.toml` so anyone can recreate the setup.",
  blocks: [
    { t: "h2", text: "Importing" },
    {
      t: "code",
      run: true,
      code: 'import math\nfrom datetime import date\nfrom statistics import mean as average\nimport random\n\nprint(math.sqrt(16))\nprint(date(2026, 10, 1).strftime("%A"))\nprint(average([2, 4, 9]))\n\nrandom.seed(1)\nprint(random.choice(["red", "green", "blue"]))',
      output: "4.0\nThursday\n5\nred",
    },
    {
      t: "list",
      items: [
        "`import math` — use it as `math.sqrt()`. Clear where each name comes from.",
        "`from datetime import date` — use `date` directly. Good for names you use a lot.",
        "`as` renames, e.g. the community standard `import pandas as pd`.",
        "Avoid `from module import *`: you can't tell where names come from.",
      ],
    },
    { t: "h2", text: "Writing your own module" },
    {
      t: "code",
      file: "pricing.py",
      code: 'VAT_RATE = 0.21\n\n\ndef with_vat(amount: float) -> float:\n    return round(amount * (1 + VAT_RATE), 2)\n\n\nif __name__ == "__main__":\n    # runs only with: python pricing.py\n    print(with_vat(100))',
    },
    {
      t: "code",
      file: "app.py",
      code: "from pricing import with_vat\n\nprint(with_vat(50))",
    },
    {
      t: "code",
      file: "terminal",
      code: "$ python app.py\n60.5\n$ python pricing.py\n121.0",
    },
    {
      t: "note",
      tone: "tip",
      title: "if __name__ == \"__main__\"",
      text: "Python sets `__name__` to `\"__main__\"` only for the file you run directly. Code under this check runs when you run the file, but not when another file imports it.",
    },
    { t: "h2", text: "Packages" },
    {
      t: "code",
      file: "project layout",
      code: "shop/\n├── pyproject.toml\n└── src/\n    └── shop/\n        ├── __init__.py\n        ├── pricing.py\n        └── orders.py",
    },
    {
      t: "p",
      text: "A folder with an `__init__.py` file is a package, imported with dots: `from shop.pricing import with_vat`. The `src/` layout is the current recommendation because it stops you accidentally importing code that isn't installed.",
    },
    { t: "h2", text: "Virtual environments" },
    {
      t: "p",
      text: "Each project needs its own versions of packages. A virtual environment is a folder (usually `.venv`) holding a private copy of Python's package directory, so projects can't break each other.",
    },
    {
      t: "code",
      file: "terminal — with the standard tools",
      code: "python -m venv .venv\nsource .venv/bin/activate      # Windows: .venv\\Scripts\\activate\npip install requests\npip freeze > requirements.txt",
    },
    {
      t: "code",
      file: "terminal — with uv",
      code: "uv init shop\ncd shop\nuv add requests        # creates .venv and updates pyproject.toml\nuv run main.py         # runs inside the environment",
    },
    {
      t: "p",
      text: "`uv` is a newer, very fast tool that installs Python versions, creates the environment and records dependencies in one step. Both approaches are fine; new projects increasingly use `uv`.",
    },
    { t: "h2", text: "pyproject.toml" },
    {
      t: "code",
      file: "pyproject.toml",
      code: '[project]\nname = "shop"\nversion = "0.1.0"\nrequires-python = ">=3.12"\ndependencies = [\n    "requests>=2.32",\n]',
    },
    {
      t: "p",
      text: "`pyproject.toml` is the standard place for a project's name, Python version and dependencies. Commit it to git; never commit the `.venv` folder.",
    },
  ],
  exercise: {
    prompt:
      "Use the standard library: import `Counter` from `collections` and `mean` from `statistics`. For `rolls = [3, 6, 2, 6, 6, 1, 3]`, print the most common roll and how often it appears as a tuple, then the average roll rounded to 2 decimals.",
    starter: "rolls = [3, 6, 2, 6, 6, 1, 3]\n",
    expected: "(6, 3)\n3.86",
    hints: [
      "`from collections import Counter` and `from statistics import mean`.",
      "`Counter(rolls).most_common(1)` returns a list with one tuple — take `[0]`.",
      "print(Counter(rolls).most_common(1)[0]) and print(round(mean(rolls), 2))",
    ],
    solution:
      "from collections import Counter\nfrom statistics import mean\n\nrolls = [3, 6, 2, 6, 6, 1, 3]\nprint(Counter(rolls).most_common(1)[0])\nprint(round(mean(rolls), 2))",
  },
  quiz: [
    {
      q: "What makes a folder a regular Python package?",
      options: ["A `setup.py` file", "An `__init__.py` file", "Its name in capitals"],
      answer: 1,
      why: "`__init__.py` marks the folder as a package.",
    },
    {
      q: "Code under `if __name__ == \"__main__\":` runs when...",
      options: ["The file is imported", "The file is run directly", "Always"],
      answer: 1,
      why: "It's skipped when another module imports the file.",
    },
    {
      q: "Should you commit `.venv` to git?",
      options: ["Yes", "No — commit pyproject.toml instead", "Only on Windows"],
      answer: 1,
      why: "Environments are recreated from the dependency list; they're large and machine-specific.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
