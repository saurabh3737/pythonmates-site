import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "testing-with-pytest",
  path: "intermediate",
  title: "Testing with pytest",
  description:
    "Test Python code with pytest: assert-based tests, running pytest, parametrized tests, testing exceptions, fixtures and how tests make AI-written code safe to use.",
  minutes: 12,
  answer:
    "A test is a small function that runs your code and checks the result with `assert`. pytest finds every function named `test_*` in files named `test_*.py`, runs them and reports what failed and why. Tests let you change code — or accept code from an AI assistant — with confidence.",
  blocks: [
    { t: "h2", text: "assert: the core of every test" },
    {
      t: "code",
      run: true,
      code: 'def slugify(title: str) -> str:\n    return "-".join(title.lower().split())\n\nassert slugify("Hello World") == "hello-world"\nassert slugify("  Python  Rocks ") == "python-rocks"\nprint("All checks passed")',
      output: "All checks passed",
    },
    {
      t: "p",
      text: "`assert condition` does nothing when the condition is true and raises `AssertionError` when it's false. pytest builds on this plain Python statement.",
    },
    { t: "h2", text: "Your first pytest file" },
    {
      t: "code",
      file: "text_utils.py",
      code: 'def slugify(title: str) -> str:\n    return "-".join(title.lower().split())',
    },
    {
      t: "code",
      file: "test_text_utils.py",
      code: 'from text_utils import slugify\n\n\ndef test_simple_title():\n    assert slugify("Hello World") == "hello-world"\n\n\ndef test_extra_spaces():\n    assert slugify("  Python   Rocks ") == "python-rocks"\n\n\ndef test_empty():\n    assert slugify("") == ""',
    },
    {
      t: "code",
      file: "terminal",
      code: "$ uv add --dev pytest\n$ uv run pytest -q\n...                                                  [100%]\n3 passed in 0.01s",
    },
    { t: "h2", text: "When a test fails" },
    {
      t: "code",
      file: "terminal",
      code: "$ uv run pytest -q\nF..                                                  [100%]\n___________________ test_simple_title ___________________\n\n    def test_simple_title():\n>       assert slugify(\"Hello World\") == \"hello_world\"\nE       AssertionError: assert 'hello-world' == 'hello_world'\n\ntest_text_utils.py:5: AssertionError\n1 failed, 2 passed in 0.02s",
    },
    {
      t: "p",
      text: "pytest shows both values side by side, so you can see immediately whether the code or the test expectation is wrong.",
    },
    { t: "h2", text: "Many cases, one test" },
    {
      t: "code",
      file: "test_text_utils.py",
      code: 'import pytest\nfrom text_utils import slugify\n\n\n@pytest.mark.parametrize(\n    ("title", "expected"),\n    [\n        ("Hello World", "hello-world"),\n        ("ONE", "one"),\n        ("a  b   c", "a-b-c"),\n    ],\n)\ndef test_slugify(title: str, expected: str):\n    assert slugify(title) == expected',
    },
    { t: "h2", text: "Testing that errors are raised" },
    {
      t: "code",
      file: "test_pricing.py",
      code: 'import pytest\n\n\ndef apply_discount(price: float, percent: float) -> float:\n    if not 0 <= percent <= 100:\n        raise ValueError("percent must be between 0 and 100")\n    return round(price * (1 - percent / 100), 2)\n\n\ndef test_discount():\n    assert apply_discount(80, 25) == 60\n\n\ndef test_invalid_percent():\n    with pytest.raises(ValueError, match="between 0 and 100"):\n        apply_discount(80, 150)',
    },
    { t: "h2", text: "Fixtures: shared test setup" },
    {
      t: "code",
      file: "test_cart.py",
      code: 'import pytest\n\n\n@pytest.fixture\ndef cart() -> list[dict]:\n    return [{"item": "mug", "price": 8.5}, {"item": "tea", "price": 3.0}]\n\n\ndef test_total(cart):\n    assert sum(line["price"] for line in cart) == 11.5\n\n\ndef test_count(cart):\n    assert len(cart) == 2',
    },
    {
      t: "p",
      text: "A fixture is a function pytest runs before each test that asks for it by name. Every test gets a fresh copy, so tests can't affect each other.",
    },
    {
      t: "note",
      tone: "tip",
      title: "Tests and AI assistants",
      text: "Ask an AI assistant to write a function and it will usually look right. Write (or generate, then read) a few tests first, and you'll know whether it is right — including the edge cases like empty input.",
    },
  ],
  exercise: {
    prompt:
      "Write `is_palindrome(text: str) -> bool` that ignores case and spaces, so `\"Never odd or even\"` is a palindrome. The starter includes plain `assert` tests; make them all pass so the program prints `All tests passed`.",
    starter:
      'def is_palindrome(text: str) -> bool:\n    ...\n\n\nassert is_palindrome("racecar")\nassert is_palindrome("Never odd or even")\nassert not is_palindrome("python")\nassert is_palindrome("")\nprint("All tests passed")\n',
    expected: "All tests passed",
    hints: [
      "First clean the text: lowercase it and remove spaces.",
      '`cleaned = text.lower().replace(" ", "")`',
      "A string is a palindrome if it equals its reverse: `cleaned == cleaned[::-1]`.",
    ],
    solution:
      'def is_palindrome(text: str) -> bool:\n    cleaned = text.lower().replace(" ", "")\n    return cleaned == cleaned[::-1]\n\n\nassert is_palindrome("racecar")\nassert is_palindrome("Never odd or even")\nassert not is_palindrome("python")\nassert is_palindrome("")\nprint("All tests passed")',
  },
  quiz: [
    {
      q: "Which function will pytest run as a test?",
      options: ["`check_total()`", "`test_total()`", "`total_test()`"],
      answer: 1,
      why: "pytest collects functions whose names start with `test`.",
    },
    {
      q: "How do you check that code raises a ValueError?",
      options: ["`assert ValueError`", "`with pytest.raises(ValueError):`", "`try: ... except: pass`"],
      answer: 1,
      why: "`pytest.raises` fails the test if the error doesn't happen.",
    },
    {
      q: "What does `@pytest.mark.parametrize` do?",
      options: ["Runs one test with several sets of inputs", "Makes tests run in parallel", "Skips a test"],
      answer: 0,
      why: "Each parameter set becomes its own test case in the report.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
