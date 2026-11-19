import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "matplotlib",
  path: "ai",
  title: "Charts with matplotlib",
  description:
    "Plot data in Python with matplotlib: line, bar and scatter charts, titles and labels, several charts side by side, plotting straight from pandas, and saving charts as images.",
  minutes: 11,
  answer:
    "matplotlib is Python's standard plotting library. Create a figure and axes with `fig, ax = plt.subplots()`, draw with `ax.plot()`, `ax.bar()` or `ax.scatter()`, label everything, then `plt.show()` or `fig.savefig(\"chart.png\")`. pandas and most AI libraries use it for their built-in charts.",
  blocks: [
    { t: "h2", text: "A line chart" },
    {
      t: "code",
      run: true,
      code: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]\nusers = [120, 180, 260, 310, 420, 560]\n\nfig, ax = plt.subplots(figsize=(7, 4))\nax.plot(months, users, marker="o", color="#3776ab", linewidth=2)\nax.set_title("Monthly active users")\nax.set_xlabel("Month")\nax.set_ylabel("Users")\nax.grid(alpha=0.3)\nplt.show()',
    },
    {
      t: "img",
      src: "/images/lessons/matplotlib-line.png",
      alt: "Line chart of monthly active users rising from 120 in January to 560 in June",
      caption: "Press Run above to draw it yourself, then change the numbers or the colour.",
    },
    {
      t: "list",
      items: [
        "`fig` is the whole image; `ax` is one chart inside it. Calling methods on `ax` is the recommended style.",
        "Always add a title and axis labels — a chart without them is a guessing game.",
        "`marker=\"o\"` shows each data point; `alpha` controls transparency.",
      ],
    },
    { t: "h2", text: "Bar charts" },
    {
      t: "code",
      run: true,
      code: 'import matplotlib.pyplot as plt\n\nlanguages = ["Python", "JavaScript", "SQL", "Java", "Go"]\nshare = [51, 42, 38, 30, 14]\n\nfig, ax = plt.subplots(figsize=(7, 4))\nbars = ax.barh(languages, share, color="#3776ab")\nax.bar_label(bars, fmt="%d%%", padding=3)\nax.invert_yaxis()\nax.set_title("Languages used by a sample team (%)")\nax.set_xlim(0, 60)\nplt.show()',
    },
    {
      t: "img",
      src: "/images/lessons/matplotlib-bar.png",
      alt: "Horizontal bar chart with Python at the top at 51 percent",
    },
    {
      t: "p",
      text: "Horizontal bars (`barh`) keep long category names readable. `bar_label` writes the values on the bars so readers don't have to estimate.",
    },
    { t: "h2", text: "Scatter plots and several charts" },
    {
      t: "code",
      run: true,
      code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\nrng = np.random.default_rng(7)\nhours = rng.uniform(0, 10, 60)\nscore = 40 + 5 * hours + rng.normal(0, 6, 60)\n\nfig, (left, right) = plt.subplots(1, 2, figsize=(9, 3.6))\nleft.scatter(hours, score, alpha=0.7, color="#3776ab")\nleft.set_title("Study hours vs exam score")\nleft.set_xlabel("Hours")\nleft.set_ylabel("Score")\n\nright.hist(score, bins=10, color="#ffd43b", edgecolor="#333")\nright.set_title("Score distribution")\nfig.tight_layout()\nplt.show()',
    },
    {
      t: "img",
      src: "/images/lessons/matplotlib-scatter.png",
      alt: "Scatter plot showing scores rising with study hours, next to a histogram of scores",
    },
    {
      t: "p",
      text: "Before training any model, plot the data: a scatter plot shows whether two values move together, and a histogram shows how values are spread and whether there are outliers.",
    },
    { t: "h2", text: "Plotting from pandas and saving" },
    {
      t: "code",
      file: "Python · run on your computer",
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"month": ["Jan", "Feb", "Mar"], "eu": [120, 150, 170], "india": [90, 160, 240]})\nax = df.plot(x="month", kind="bar", title="Revenue by region")\nax.figure.savefig("revenue.png", dpi=150, bbox_inches="tight")',
    },
    {
      t: "note",
      tone: "tip",
      title: "Saving charts",
      text: "`savefig` supports PNG for slides and web, and SVG or PDF for sharp printing. Use `bbox_inches=\"tight\"` so labels aren't cut off.",
    },
  ],
  exercise: {
    prompt:
      "Prepare data for a chart. From `sales = {\"Mon\": 120, \"Tue\": 95, \"Wed\": 140, \"Thu\": 80, \"Fri\": 160}`, print the list of days and the list of values (the two inputs for `ax.bar`), then the day with the highest sales. Bonus: plot it with `ax.bar(days, values)` and press Run.",
    starter: 'sales = {"Mon": 120, "Tue": 95, "Wed": 140, "Thu": 80, "Fri": 160}\n',
    expected: "['Mon', 'Tue', 'Wed', 'Thu', 'Fri']\n[120, 95, 140, 80, 160]\nFri",
    hints: [
      "`list(sales.keys())` and `list(sales.values())`.",
      "`max(sales, key=sales.get)` returns the key with the biggest value.",
      "For the bonus: `import matplotlib.pyplot as plt`, `fig, ax = plt.subplots()`, `ax.bar(days, values)`, `plt.show()`.",
    ],
    solution:
      'sales = {"Mon": 120, "Tue": 95, "Wed": 140, "Thu": 80, "Fri": 160}\ndays = list(sales.keys())\nvalues = list(sales.values())\nprint(days)\nprint(values)\nprint(max(sales, key=sales.get))',
  },
  quiz: [
    {
      q: "What does `fig, ax = plt.subplots()` give you?",
      options: ["Two charts", "A figure and one set of axes to draw on", "A saved image"],
      answer: 1,
      why: "The figure is the canvas; the axes is the chart area you draw on.",
    },
    {
      q: "Which chart shows whether two numeric values move together?",
      options: ["Pie chart", "Scatter plot", "Histogram"],
      answer: 1,
      why: "Each point is one pair of values, so trends and clusters become visible.",
    },
    {
      q: "Why add `bbox_inches=\"tight\"` to `savefig`?",
      options: ["Smaller file", "So labels aren't cut off", "Higher resolution"],
      answer: 1,
      why: "It trims the image to fit everything that was drawn.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
