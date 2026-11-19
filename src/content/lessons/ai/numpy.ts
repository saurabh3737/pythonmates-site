import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "numpy",
  path: "ai",
  title: "NumPy essentials",
  description:
    "NumPy for AI and data: arrays and shapes, vectorised maths, broadcasting, boolean masks, aggregations along axes, random numbers, and dot products and cosine similarity for embeddings.",
  minutes: 13,
  answer:
    "NumPy gives Python fast arrays of numbers. Instead of looping, you write maths on whole arrays at once — `prices * 1.21` — and NumPy runs it in optimised C code. Almost every AI and data library, from pandas to PyTorch, is built on the same ideas: arrays, shapes, vectorised operations and broadcasting.",
  blocks: [
    { t: "h2", text: "Arrays and shapes" },
    {
      t: "code",
      run: true,
      code: "import numpy as np\n\nscores = np.array([72, 88, 95, 61])\ngrid = np.array([[1, 2, 3], [4, 5, 6]])\n\nprint(scores.shape, grid.shape)\nprint(grid.ndim, grid.size, grid.dtype)\nprint(grid[1, 2], grid[:, 0])",
      output: "(4,) (2, 3)\n2 6 int64\n6 [1 4]",
    },
    {
      t: "list",
      items: [
        "`shape` is the size along each dimension: `(rows, columns)` for a 2-D array.",
        "All items share one type (`dtype`), which is what makes arrays fast and compact.",
        "Index with `[row, column]`; `:` means \"everything along this axis\".",
      ],
    },
    { t: "h2", text: "Vectorised maths" },
    {
      t: "code",
      run: true,
      code: "import numpy as np\n\nprices = np.array([12.5, 8.0, 30.0])\nqty = np.array([2, 5, 1])\n\nprint(prices * qty)\nprint((prices * qty).sum())\nprint(np.sqrt(np.array([4, 9, 16])))\nprint(np.round(prices * 1.21, 2))",
      output: "[25. 40. 30.]\n95.0\n[2. 3. 4.]\n[15.12  9.68 36.3 ]",
    },
    {
      t: "p",
      text: "Operations work element by element, with no loop in sight. On a million numbers this is typically 50–100 times faster than a Python `for` loop.",
    },
    { t: "h2", text: "Broadcasting" },
    {
      t: "code",
      run: true,
      code: "import numpy as np\n\nsales = np.array([[10, 20, 30],\n                  [40, 50, 60]])   # 2 shops x 3 products\nprice = np.array([1.5, 2.0, 0.5])    # one price per product\n\nprint(sales * price)\nprint((sales * price).sum(axis=1))  # revenue per shop",
      output: "[[ 15.  40.  15.]\n [ 60. 100.  30.]]\n[ 70. 190.]",
    },
    {
      t: "p",
      text: "NumPy stretches the smaller array across the bigger one when their trailing dimensions match — here the 3 prices apply to every row. `axis=1` sums across columns (per row); `axis=0` sums down rows (per column).",
    },
    { t: "h2", text: "Filtering with boolean masks" },
    {
      t: "code",
      run: true,
      code: "import numpy as np\n\ntemps = np.array([12.1, 19.4, 23.8, 17.0, 25.3])\nhot = temps > 20\nprint(hot)\nprint(temps[hot])\nprint(np.where(temps > 20, \"hot\", \"mild\"))\nprint(temps.mean().round(2), temps.max(), temps.argmax())",
      output: "[False False  True False  True]\n[23.8 25.3]\n['mild' 'mild' 'hot' 'mild' 'hot']\n19.52 25.3 4",
    },
    { t: "h2", text: "Random numbers, reproducibly" },
    {
      t: "code",
      run: true,
      code: "import numpy as np\n\nrng = np.random.default_rng(seed=42)\nprint(rng.integers(1, 7, size=5))\nweights = rng.normal(loc=0, scale=1, size=(2, 3))\nprint(weights.shape)",
      output: "[1 5 4 3 3]\n(2, 3)",
    },
    {
      t: "p",
      text: "Machine learning uses random numbers everywhere: initial model weights, shuffling data, splitting train and test sets. A fixed `seed` makes results repeatable.",
    },
    { t: "h2", text: "Dot products and cosine similarity" },
    {
      t: "code",
      run: true,
      code: 'import numpy as np\n\ndef cosine(a: np.ndarray, b: np.ndarray) -> float:\n    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))\n\n# toy 3-number "embeddings" of three sentences\ncat = np.array([0.9, 0.1, 0.0])\nkitten = np.array([0.8, 0.2, 0.1])\ninvoice = np.array([0.0, 0.1, 0.95])\n\nprint(round(cosine(cat, kitten), 3))\nprint(round(cosine(cat, invoice), 3))',
      output: "0.984\n0.012",
    },
    {
      t: "p",
      text: "AI models turn text into embeddings: long arrays of numbers where similar meanings point in similar directions. Cosine similarity, built from a dot product (`@`), measures that direction. It is the heart of semantic search and RAG.",
    },
  ],
  exercise: {
    prompt:
      "Min-max scale exam scores to the range 0–1, a common step before training a model. With `scores = np.array([50, 70, 90, 100])`, compute `(scores - min) / (max - min)`, then print the scaled array and the number of students above 0.5.",
    starter: "import numpy as np\n\nscores = np.array([50, 70, 90, 100])\n",
    expected: "[0.  0.4 0.8 1. ]\n2",
    hints: [
      "`scores.min()` and `scores.max()` give the extremes.",
      "`scaled = (scores - scores.min()) / (scores.max() - scores.min())`",
      "Count with a mask: `(scaled > 0.5).sum()`.",
    ],
    solution:
      "import numpy as np\n\nscores = np.array([50, 70, 90, 100])\nscaled = (scores - scores.min()) / (scores.max() - scores.min())\nprint(scaled)\nprint((scaled > 0.5).sum())",
  },
  quiz: [
    {
      q: "What is the shape of `np.array([[1, 2], [3, 4], [5, 6]])`?",
      options: ["(2, 3)", "(3, 2)", "(6,)"],
      answer: 1,
      why: "3 rows of 2 columns.",
    },
    {
      q: "What does `arr[arr > 0]` return?",
      options: ["True/False values", "Only the positive elements", "The index of the first positive"],
      answer: 1,
      why: "A boolean mask selects the elements where it is True.",
    },
    {
      q: "A cosine similarity close to 1 means...",
      options: ["The vectors are unrelated", "The vectors point in a similar direction", "The vectors are the same length"],
      answer: 1,
      why: "For embeddings, that means similar meaning.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
