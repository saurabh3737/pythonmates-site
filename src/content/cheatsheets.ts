// Printable one-page cheat sheets. Each item is a short code snippet with a note.

export type CheatItem = { code: string; note: string };
export type CheatSection = { title: string; items: CheatItem[] };
export type CheatSheet = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  related: string[]; // lesson URLs
  sections: CheatSection[];
  updated: string;
};

export const cheatsheets: CheatSheet[] = [
  {
    slug: "python-basics",
    title: "Python basics cheat sheet",
    description:
      "Python basics on one page: variables, strings and f-strings, lists, dicts, sets, conditions, loops, functions, files and errors — modern Python 3 syntax.",
    answer:
      "The core of Python on one page: values and variables, text, the four built-in collections, if/elif/else, for and while loops, functions, files and error handling. Print it or save it as a PDF.",
    related: ["/learn/beginner/variables/", "/learn/beginner/lists/", "/learn/beginner/functions/"],
    updated: "2026-11-19",
    sections: [
      {
        title: "Values and variables",
        items: [
          { code: 'name = "Asha"; age = 30; price = 9.99; ok = True', note: "str, int, float, bool" },
          { code: "x, y = 3, 4\nx, y = y, x", note: "multiple assignment, swap" },
          { code: "type(age)  # <class 'int'>", note: "check a type" },
          { code: 'int("42"), float("2.5"), str(7)', note: "convert between types" },
          { code: "7 / 2, 7 // 2, 7 % 2, 2 ** 10", note: "3.5, 3, 1, 1024" },
        ],
      },
      {
        title: "Strings",
        items: [
          { code: 'f"{name} is {age}"', note: "f-string" },
          { code: 'f"{price:,.2f}"  # 1,234.50', note: "format numbers" },
          { code: 's[0], s[-1], s[1:4], s[::-1]', note: "index, slice, reverse" },
          { code: 's.strip().lower().replace("a", "b")', note: "clean and change" },
          { code: 's.split(","), ", ".join(parts)', note: "split and join" },
          { code: '"py" in s, s.startswith("Py")', note: "search" },
        ],
      },
      {
        title: "Lists, tuples, sets",
        items: [
          { code: "items = [3, 1, 2]\nitems.append(4); items.insert(0, 0)", note: "add" },
          { code: "items.remove(1); last = items.pop()", note: "remove" },
          { code: "sorted(items), items.sort(reverse=True)", note: "new sorted list / sort in place" },
          { code: "len(items), sum(items), max(items)", note: "size and totals" },
          { code: "point = (3, 4); x, y = point", note: "tuple and unpacking" },
          { code: "a | b, a & b, a - b", note: "set union, intersection, difference" },
        ],
      },
      {
        title: "Dictionaries",
        items: [
          { code: 'user = {"name": "Ana", "age": 31}', note: "create" },
          { code: 'user["name"], user.get("email", "-")', note: "read; safe read with default" },
          { code: 'user["city"] = "Ghent"; user.pop("age")', note: "add/change, remove" },
          { code: "for key, value in user.items(): ...", note: "loop over pairs" },
          { code: "{w: len(w) for w in words}", note: "dict comprehension" },
        ],
      },
      {
        title: "Conditions and loops",
        items: [
          { code: 'if x > 0:\n    ...\nelif x == 0:\n    ...\nelse:\n    ...', note: "if / elif / else" },
          { code: 'label = "big" if n > 9 else "small"', note: "one-line conditional" },
          { code: "for i, item in enumerate(items, start=1): ...", note: "position and item" },
          { code: "for a, b in zip(names, scores): ...", note: "two lists together" },
          { code: "while balance < goal: ...", note: "repeat while true; break / continue" },
          { code: "[x * 2 for x in nums if x > 0]", note: "list comprehension" },
        ],
      },
      {
        title: "Functions, files and errors",
        items: [
          { code: "def area(w: float, h: float = 1) -> float:\n    return w * h", note: "function with type hints and default" },
          { code: "def total(*nums): ...\ndef opts(**kw): ...", note: "any number of arguments" },
          { code: 'with open("a.txt", encoding="utf-8") as f:\n    text = f.read()', note: "read a file" },
          { code: 'Path("a.txt").write_text("hi", encoding="utf-8")', note: "pathlib (from pathlib import Path)" },
          { code: "try:\n    n = int(s)\nexcept ValueError:\n    n = 0", note: "handle an error" },
          { code: 'raise ValueError("bad input")', note: "report an error" },
        ],
      },
    ],
  },
  {
    slug: "pandas",
    title: "pandas cheat sheet",
    description:
      "pandas on one page: create and load DataFrames, inspect, select and filter, add columns, groupby and aggregate, sort, merge, handle missing values and save results.",
    answer:
      "The pandas commands you'll use every day, from loading a CSV to grouping, merging, cleaning and saving. Import it as `import pandas as pd`.",
    related: ["/learn/ai/pandas/", "/learn/ai/numpy/", "/learn/ai/matplotlib/"],
    updated: "2026-11-19",
    sections: [
      {
        title: "Load and save",
        items: [
          { code: 'df = pd.read_csv("sales.csv", parse_dates=["date"])', note: "read CSV" },
          { code: 'pd.read_excel("file.xlsx", sheet_name="Q1")', note: "read Excel (needs openpyxl)" },
          { code: 'pd.DataFrame({"a": [1, 2], "b": ["x", "y"]})', note: "create from a dict" },
          { code: 'df.to_csv("out.csv", index=False)', note: "save CSV" },
          { code: 'df.to_parquet("out.parquet")', note: "fast, typed file format" },
        ],
      },
      {
        title: "Inspect",
        items: [
          { code: "df.head(), df.tail(3), df.sample(5)", note: "look at rows" },
          { code: "df.shape, df.columns, df.dtypes", note: "size, names, types" },
          { code: "df.info(), df.describe()", note: "summary and statistics" },
          { code: 'df["city"].value_counts()', note: "count each value" },
          { code: "df.isna().sum()", note: "missing values per column" },
        ],
      },
      {
        title: "Select and filter",
        items: [
          { code: 'df["units"], df[["city", "units"]]', note: "one or several columns" },
          { code: 'df[df["units"] > 10]', note: "rows matching a condition" },
          { code: 'df[(df["a"] > 1) & (df["b"] == "x")]', note: "combine with & and |, use brackets" },
          { code: 'df.query("units > 10 and city == \'Pune\'")', note: "the same as text" },
          { code: 'df.loc[0, "city"], df.iloc[0, 0]', note: "by label / by position" },
          { code: 'df[df["city"].isin(["Pune", "Ghent"])]', note: "value in a list" },
        ],
      },
      {
        title: "Change",
        items: [
          { code: 'df["revenue"] = df["units"] * df["price"]', note: "new column" },
          { code: 'df.rename(columns={"qty": "units"})', note: "rename" },
          { code: 'df.drop(columns=["tmp"])', note: "remove columns" },
          { code: 'df["name"].str.strip().str.lower()', note: "string methods on a column" },
          { code: 'df["date"].dt.month', note: "date parts" },
          { code: 'df.sort_values("revenue", ascending=False)', note: "sort" },
        ],
      },
      {
        title: "Group and combine",
        items: [
          { code: 'df.groupby("city")["revenue"].sum()', note: "total per group" },
          { code: 'df.groupby("city").agg(total=("revenue", "sum"), n=("id", "count"))', note: "several named results" },
          { code: 'df.pivot_table(index="city", columns="product", values="units", aggfunc="sum")', note: "pivot table" },
          { code: 'orders.merge(customers, on="customer_id", how="left")', note: "join two tables" },
          { code: "pd.concat([df1, df2], ignore_index=True)", note: "stack tables" },
        ],
      },
      {
        title: "Missing values",
        items: [
          { code: "df.dropna(), df.dropna(subset=[\"email\"])", note: "drop rows with gaps" },
          { code: 'df.fillna({"age": df["age"].median()})', note: "fill per column" },
          { code: "df.drop_duplicates()", note: "remove duplicate rows" },
          { code: 'df["price"] = pd.to_numeric(df["price"], errors="coerce")', note: "bad text becomes NaN" },
        ],
      },
    ],
  },
  {
    slug: "python-for-ai",
    title: "Python for AI cheat sheet",
    description:
      "Python for AI on one page: NumPy arrays, matplotlib charts, scikit-learn train/test/predict, calling an LLM API, structured output with Pydantic, and a minimal RAG loop.",
    answer:
      "The building blocks of AI work in Python: arrays with NumPy, quick charts, a scikit-learn model in five lines, calling an LLM, validating its JSON with Pydantic, and the retrieve-then-generate loop behind RAG.",
    related: ["/learn/ai/numpy/", "/learn/ai/scikit-learn/", "/learn/ai/llm-apis/", "/learn/ai/rag-basics/"],
    updated: "2026-11-19",
    sections: [
      {
        title: "NumPy",
        items: [
          { code: "a = np.array([1, 2, 3]); a.shape, a.dtype", note: "create and inspect" },
          { code: "a * 2, a + b, np.sqrt(a)", note: "vectorised maths, no loops" },
          { code: "m.sum(axis=0), m.mean(axis=1)", note: "per column / per row" },
          { code: "a[a > 1], np.where(a > 1, 1, 0)", note: "filter and choose" },
          { code: "rng = np.random.default_rng(42)", note: "reproducible random numbers" },
          { code: "a @ b / (np.linalg.norm(a) * np.linalg.norm(b))", note: "cosine similarity" },
        ],
      },
      {
        title: "Charts",
        items: [
          { code: "fig, ax = plt.subplots(figsize=(7, 4))", note: "figure and axes" },
          { code: "ax.plot(x, y); ax.bar(x, y); ax.scatter(x, y)", note: "line, bar, scatter" },
          { code: 'ax.set_title("..."); ax.set_xlabel("..."); ax.set_ylabel("...")', note: "always label" },
          { code: 'fig.savefig("chart.png", dpi=150, bbox_inches="tight")', note: "save" },
        ],
      },
      {
        title: "scikit-learn",
        items: [
          { code: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)", note: "split" },
          { code: "model = make_pipeline(StandardScaler(), LogisticRegression())", note: "preprocessing + model" },
          { code: "model.fit(X_train, y_train)", note: "train" },
          { code: "pred = model.predict(X_test)", note: "predict" },
          { code: "accuracy_score(y_test, pred), confusion_matrix(y_test, pred)", note: "evaluate" },
          { code: "cross_val_score(model, X, y, cv=5).mean()", note: "more honest score" },
        ],
      },
      {
        title: "Calling an LLM",
        items: [
          { code: "client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY", note: "key from environment, never in code" },
          {
            code: 'r = client.messages.create(model=MODEL, max_tokens=400,\n    system="You are concise.", messages=[{"role": "user", "content": q}])',
            note: "one request",
          },
          { code: "r.content[0].text, r.usage.input_tokens", note: "answer and token count" },
          { code: "messages.append({\"role\": \"assistant\", \"content\": answer})", note: "send history each time" },
          { code: "with client.messages.stream(...) as s:\n    for t in s.text_stream: ...", note: "stream tokens" },
        ],
      },
      {
        title: "Structured output",
        items: [
          { code: "class Review(BaseModel):\n    sentiment: str\n    score: int", note: "describe the JSON you want" },
          { code: "Review.model_json_schema()", note: "schema to put in the prompt" },
          { code: "Review.model_validate_json(reply)", note: "parse and check, or raise ValidationError" },
        ],
      },
      {
        title: "RAG in four lines",
        items: [
          { code: "chunks = split(documents, size=500, overlap=50)", note: "1. chunk" },
          { code: "vectors = embed(chunks)  # normalise to length 1", note: "2. embed and store" },
          { code: "best = [chunks[i] for i in np.argsort(vectors @ embed(q))[::-1][:3]]", note: "3. retrieve top 3" },
          { code: 'prompt = f"Answer only from these sources...\\n{best}\\nQuestion: {q}"', note: "4. generate with sources" },
        ],
      },
    ],
  },
];

export function getCheatsheet(slug: string): CheatSheet | undefined {
  return cheatsheets.find((c) => c.slug === slug);
}
