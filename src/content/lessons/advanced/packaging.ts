import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "packaging",
  path: "advanced",
  title: "Packaging and publishing",
  description:
    "Package and share Python code: project layout, pyproject.toml, versions and dependencies, command-line entry points, building wheels with uv and publishing to PyPI.",
  minutes: 12,
  answer:
    "A Python package is described by a `pyproject.toml` file: name, version, dependencies and how to build it. `uv build` turns your project into a wheel (`.whl`) that anyone can install with `pip install`, and `uv publish` uploads it to PyPI. Entry points let users run your tool as a normal command.",
  blocks: [
    { t: "h2", text: "Project layout" },
    {
      t: "code",
      file: "layout",
      code: "slugkit/\n├── pyproject.toml\n├── README.md\n├── src/\n│   └── slugkit/\n│       ├── __init__.py\n│       └── core.py\n└── tests/\n    └── test_core.py",
    },
    {
      t: "code",
      file: "src/slugkit/core.py",
      code: 'import re\n\n\ndef slugify(text: str) -> str:\n    """Turn any title into a URL-friendly slug."""\n    text = re.sub(r"[^a-z0-9]+", "-", text.lower())\n    return text.strip("-")\n\n\ndef main() -> None:\n    import sys\n    print(slugify(" ".join(sys.argv[1:])))',
    },
    {
      t: "code",
      file: "src/slugkit/__init__.py",
      code: 'from slugkit.core import slugify\n\n__all__ = ["slugify"]\n__version__ = "0.1.0"',
    },
    { t: "h2", text: "pyproject.toml" },
    {
      t: "code",
      file: "pyproject.toml",
      code: '[project]\nname = "slugkit"\nversion = "0.1.0"\ndescription = "Turn titles into URL slugs"\nreadme = "README.md"\nrequires-python = ">=3.10"\nauthors = [{ name = "Your Name", email = "you@example.com" }]\nlicense = "MIT"\ndependencies = []\n\n[project.scripts]\nslugkit = "slugkit.core:main"\n\n[dependency-groups]\ndev = ["pytest>=8"]\n\n[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"',
    },
    {
      t: "list",
      items: [
        "`[project]` holds the metadata PyPI shows: name, version, description, Python versions.",
        "`dependencies` lists what users need installed; keep version ranges loose for libraries.",
        "`[project.scripts]` creates a `slugkit` command that runs `main()`.",
        "`[dependency-groups]` holds tools only you need while developing, like pytest.",
        "`[build-system]` says which tool builds the package; Hatchling is a common default.",
      ],
    },
    { t: "h2", text: "Try it locally" },
    {
      t: "code",
      file: "terminal",
      code: '$ uv sync                      # create .venv and install the project\n$ uv run slugkit "Hello, Python World!"\nhello-python-world\n$ uv run pytest -q\n.                                                    [100%]\n1 passed',
    },
    { t: "h2", text: "Build and publish" },
    {
      t: "code",
      file: "terminal",
      code: "$ uv build\nBuilding source distribution...\nBuilding wheel from source distribution...\nSuccessfully built dist/slugkit-0.1.0.tar.gz\nSuccessfully built dist/slugkit-0.1.0-py3-none-any.whl\n\n$ uv publish --publish-url https://test.pypi.org/legacy/   # practise on TestPyPI first\n$ uv publish                                               # the real PyPI",
    },
    {
      t: "note",
      tone: "tip",
      title: "Use trusted publishing",
      text: "Instead of storing a PyPI password or token, connect your GitHub repository to PyPI with trusted publishing, and let a GitHub Actions workflow publish each tagged release.",
    },
    { t: "h2", text: "Versions" },
    {
      t: "p",
      text: "Most packages use semantic versioning, `MAJOR.MINOR.PATCH`: bump PATCH for bug fixes, MINOR for new features that don't break anything, and MAJOR for breaking changes. A version can never be re-uploaded to PyPI, so every release needs a new number.",
    },
  ],
  exercise: {
    prompt:
      "Package tools compare versions as numbers, not text. Write `parse_version(v: str) -> tuple[int, ...]` that turns `\"3.15.0\"` into `(3, 15, 0)`. Then print `\"3.9.1\" < \"3.15.0\"` as plain strings, the same comparison with your function, and the newest of `[\"0.9.0\", \"0.10.2\", \"0.10.10\"]` using `max(..., key=parse_version)`.",
    starter: "def parse_version(v: str) -> tuple[int, ...]:\n    ...\n\n",
    expected: "False\nTrue\n0.10.10",
    hints: [
      '`v.split(".")` gives the parts as strings.',
      "Convert each with `int` and wrap in `tuple(...)`.",
      'return tuple(int(part) for part in v.split("."))',
    ],
    solution:
      'def parse_version(v: str) -> tuple[int, ...]:\n    return tuple(int(part) for part in v.split("."))\n\nprint("3.9.1" < "3.15.0")\nprint(parse_version("3.9.1") < parse_version("3.15.0"))\nprint(max(["0.9.0", "0.10.2", "0.10.10"], key=parse_version))',
  },
  quiz: [
    {
      q: "Where do you list a package's runtime dependencies?",
      options: ["requirements.txt only", "`dependencies` in pyproject.toml", "In the README"],
      answer: 1,
      why: "`pyproject.toml` is the standard home for package metadata.",
    },
    {
      q: "What does `[project.scripts]` create?",
      options: ["Test scripts", "A terminal command that runs a function", "Build steps"],
      answer: 1,
      why: "An entry point installs a command such as `slugkit`.",
    },
    {
      q: "You fixed a bug without changing features. Version 1.4.2 becomes...",
      options: ["2.0.0", "1.5.0", "1.4.3"],
      answer: 2,
      why: "Bug fixes bump the PATCH number.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
