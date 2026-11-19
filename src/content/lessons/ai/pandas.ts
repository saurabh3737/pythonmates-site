import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "pandas",
  path: "ai",
  title: "pandas for data analysis",
  description:
    "pandas essentials: DataFrames, reading CSV, selecting and filtering rows, adding columns, groupby and aggregation, sorting, handling missing values and preparing data for machine learning.",
  minutes: 14,
  answer:
    "pandas is Python's spreadsheet: a `DataFrame` is a table with named columns that you can load from CSV, Excel, SQL or JSON. You select columns with `df[\"col\"]`, filter rows with conditions, summarise with `groupby`, and clean missing values — the everyday work behind every data analysis and AI project.",
  blocks: [
    { t: "h2", text: "A first DataFrame" },
    {
      t: "code",
      run: true,
      code: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "city": ["Pune", "Ghent", "Pune", "Brussels", "Ghent"],\n    "product": ["tea", "tea", "coffee", "coffee", "cake"],\n    "units": [30, 12, 25, 40, 8],\n    "price": [2.5, 3.0, 3.5, 3.2, 4.0],\n})\nprint(df.head(3))\nprint(df.shape)',
      output:
        "    city product  units  price\n0   Pune     tea     30    2.5\n1  Ghent     tea     12    3.0\n2   Pune  coffee     25    3.5\n(5, 4)",
    },
    { t: "h2", text: "Reading a CSV file" },
    {
      t: "code",
      run: true,
      code: 'import io\nimport pandas as pd\n\ncsv_text = """date,region,revenue\n2026-01-05,EU,1200\n2026-01-06,IN,900\n2026-01-06,EU,\n2026-01-07,IN,1500\n"""\ndf = pd.read_csv(io.StringIO(csv_text), parse_dates=["date"])\nprint(df)\nprint(df["revenue"].isna().sum(), "missing value")',
      output:
        "        date region  revenue\n0 2026-01-05     EU   1200.0\n1 2026-01-06     IN    900.0\n2 2026-01-06     EU      NaN\n3 2026-01-07     IN   1500.0\n1 missing value",
    },
    {
      t: "p",
      text: "On your computer you'd write `pd.read_csv(\"sales.csv\")`. Here we read from a string so it runs in the browser. Empty cells become `NaN` (\"not a number\").",
    },
    { t: "h2", text: "Selecting and filtering" },
    {
      t: "code",
      run: true,
      code: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "city": ["Pune", "Ghent", "Pune", "Brussels", "Ghent"],\n    "product": ["tea", "tea", "coffee", "coffee", "cake"],\n    "units": [30, 12, 25, 40, 8],\n    "price": [2.5, 3.0, 3.5, 3.2, 4.0],\n})\nprint(df["units"].sum())\nprint(df[["city", "units"]].tail(2))\n\nbig = df[(df["units"] > 10) & (df["product"] == "coffee")]\nprint(big)',
      output:
        "115\n       city  units\n3  Brussels     40\n4     Ghent      8\n       city product  units  price\n2      Pune  coffee     25    3.5\n3  Brussels  coffee     40    3.2",
    },
    {
      t: "note",
      tone: "tip",
      title: "& and |, with brackets",
      text: "Combine conditions with `&` (and) and `|` (or), and put each condition in brackets. Python's `and` / `or` don't work on whole columns.",
    },
    { t: "h2", text: "New columns, groupby and sorting" },
    {
      t: "code",
      run: true,
      code: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "city": ["Pune", "Ghent", "Pune", "Brussels", "Ghent"],\n    "product": ["tea", "tea", "coffee", "coffee", "cake"],\n    "units": [30, 12, 25, 40, 8],\n    "price": [2.5, 3.0, 3.5, 3.2, 4.0],\n})\ndf["revenue"] = df["units"] * df["price"]\n\nby_city = df.groupby("city")["revenue"].sum().sort_values(ascending=False)\nprint(by_city)\n\nsummary = df.groupby("product").agg(units=("units", "sum"), avg_price=("price", "mean"))\nprint(summary)',
      output:
        "city\nPune        162.5\nBrussels    128.0\nGhent        68.0\nName: revenue, dtype: float64\n         units  avg_price\nproduct                  \ncake         8       4.00\ncoffee      65       3.35\ntea         42       2.75",
    },
    { t: "h2", text: "Cleaning missing values" },
    {
      t: "code",
      run: true,
      code: 'import pandas as pd\n\ndf = pd.DataFrame({"name": ["Ana", "Ben", None, "Dev"], "age": [31, None, 28, 45]})\nprint(df.dropna())\nprint(df.fillna({"name": "unknown", "age": df["age"].median()}))',
      output:
        "  name   age\n0  Ana  31.0\n3  Dev  45.0\n      name   age\n0      Ana  31.0\n1      Ben  31.0\n2  unknown  28.0\n3      Dev  45.0",
    },
    {
      t: "p",
      text: "Real data always has gaps. Decide per column: drop rows, fill with a sensible value (the median is robust to outliers), or keep the gap and handle it later. Machine learning models usually need no missing values at all.",
    },
  ],
  exercise: {
    prompt:
      "For the orders below, add a `total` column (`qty * unit_price`), then print the total revenue per customer as a Series sorted from highest to lowest.",
    starter:
      'import pandas as pd\n\norders = pd.DataFrame({\n    "customer": ["Ana", "Ben", "Ana", "Cara", "Ben"],\n    "qty": [2, 1, 3, 5, 2],\n    "unit_price": [10.0, 25.0, 10.0, 4.0, 25.0],\n})\n',
    expected: "customer\nBen     75.0\nAna     50.0\nCara    20.0\nName: total, dtype: float64",
    hints: [
      'orders["total"] = orders["qty"] * orders["unit_price"]',
      'Group: `orders.groupby("customer")["total"].sum()`',
      "Add `.sort_values(ascending=False)` and print it.",
    ],
    solution:
      'import pandas as pd\n\norders = pd.DataFrame({\n    "customer": ["Ana", "Ben", "Ana", "Cara", "Ben"],\n    "qty": [2, 1, 3, 5, 2],\n    "unit_price": [10.0, 25.0, 10.0, 4.0, 25.0],\n})\norders["total"] = orders["qty"] * orders["unit_price"]\nprint(orders.groupby("customer")["total"].sum().sort_values(ascending=False))',
  },
  quiz: [
    {
      q: "How do you keep rows where `units` is above 10?",
      options: ['`df["units"] > 10`', '`df[df["units"] > 10]`', '`df.units(10)`'],
      answer: 1,
      why: "The condition creates a mask; `df[mask]` keeps the matching rows.",
    },
    {
      q: "What does `df.groupby(\"city\")[\"revenue\"].sum()` return?",
      options: ["One total for the whole table", "The revenue total for each city", "The number of cities"],
      answer: 1,
      why: "groupby splits by city, then sums each group.",
    },
    {
      q: "Empty cells in a CSV become...",
      options: ["0", "NaN", "An empty string, always"],
      answer: 1,
      why: "pandas marks missing values as NaN so you can find and handle them.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
