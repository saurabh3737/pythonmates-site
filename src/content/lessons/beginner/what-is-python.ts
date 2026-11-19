import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "what-is-python",
  path: "beginner",
  title: "What is Python?",
  description:
    "What Python is, why it's the most popular language for AI and data, how to install it in 2026 and how to run your first line of code.",
  minutes: 7,
  answer:
    "Python is a free, general-purpose programming language known for readable code that looks close to plain English. It runs everywhere — from scripts on your laptop to web apps and the AI systems behind ChatGPT-style tools — which makes it the most widely taught first language today.",
  blocks: [
    { t: "h2", text: "Why Python?" },
    {
      t: "list",
      items: [
        "Readable: indentation shows structure, so code is easy to follow.",
        "Batteries included: a large standard library for files, dates, the web, maths and more.",
        "Huge ecosystem: hundreds of thousands of packages on PyPI — pandas, FastAPI, PyTorch and many others.",
        "The language of AI: most machine learning and LLM tooling is written for Python first.",
        "Free and open source, on Windows, macOS, Linux and even in your browser.",
      ],
    },
    { t: "h2", text: "Where Python is used" },
    {
      t: "table",
      head: ["Area", "What people build", "Popular tools"],
      rows: [
        ["AI and machine learning", "Models, chatbots, RAG systems", "PyTorch, scikit-learn, LLM SDKs"],
        ["Data", "Analysis, dashboards, pipelines", "pandas, Polars, Airflow"],
        ["Web and APIs", "Back ends and services", "FastAPI, Django, Flask"],
        ["Automation", "Scripts that save hours of manual work", "Standard library, requests"],
        ["Science and finance", "Simulations, models, research", "NumPy, SciPy"],
      ],
    },
    { t: "h2", text: "Try it right now" },
    {
      t: "p",
      text: "You don't need to install anything to start. Press Run on the code below — Python runs inside your browser.",
    },
    {
      t: "code",
      run: true,
      code: 'print("Hello from Python!")\nprint(2 + 3)',
      output: "Hello from Python!\n5",
    },
    { t: "h2", text: "Installing Python on your computer" },
    {
      t: "p",
      text: "When you want to build projects on your own machine, install the latest Python from python.org (Windows and macOS installers), or with your system's package manager on Linux. Many developers now use `uv`, a fast tool that installs Python versions and manages project dependencies in one place.",
    },
    {
      t: "code",
      file: "terminal",
      code: "python --version\n# Python 3.15.0",
    },
    {
      t: "note",
      tone: "tip",
      title: "python or python3?",
      text: "On macOS and Linux the command is often `python3`. On Windows it's usually `python` or `py`.",
    },
    { t: "h2", text: "Python versions" },
    {
      t: "p",
      text: "A new Python version comes out every October. These lessons are tested on Python 3.15. Anything from Python 3.10 onwards will run almost all examples; older versions such as Python 2 are no longer supported and shouldn't be used for new code.",
    },
  ],
  exercise: {
    prompt: "Make Python print exactly two lines: `I am learning Python` and then the result of `7 * 6`.",
    starter: '# Write two print() lines\n',
    expected: "I am learning Python\n42",
    hints: [
      "`print()` shows whatever you put inside the brackets.",
      "Text needs quotes: `print(\"I am learning Python\")`. Numbers and maths don't.",
      "The second line is `print(7 * 6)`.",
    ],
    solution: 'print("I am learning Python")\nprint(7 * 6)',
  },
  quiz: [
    {
      q: "Why is Python so popular for AI?",
      options: [
        "It's the only language that can do maths",
        "Most AI and machine learning tools are built for Python first",
        "It runs faster than every other language",
      ],
      answer: 1,
      why: "Python itself isn't the fastest language, but the AI ecosystem — PyTorch, scikit-learn, LLM SDKs — is built around it.",
    },
    {
      q: "Should you learn Python 2 today?",
      options: ["Yes, it's more stable", "No, it's no longer supported", "Only for web apps"],
      answer: 1,
      why: "Python 2 reached end of life in 2020. All new code uses Python 3.",
    },
    {
      q: "What does `print(2 + 3)` show?",
      options: ["2 + 3", "5", "23"],
      answer: 1,
      why: "Without quotes, Python calculates the expression and prints the result.",
    },
  ],
  field: {
    title: "From the field",
    text: "In banks, research labs and tech companies, Python is the glue: the same language runs a quick data check, a production API and the AI model behind it. That's why it's worth learning properly once.",
  },
  updated: "2026-11-19",
};

export default lesson;
