import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "dataclasses",
  path: "intermediate",
  title: "Dataclasses",
  description:
    "Python dataclasses: less boilerplate with @dataclass, default values and default_factory, frozen and ordered dataclasses, asdict() and slots.",
  minutes: 9,
  answer:
    "`@dataclass` turns a class with type-annotated fields into a full data container: Python writes `__init__`, `__repr__` and `__eq__` for you. Use it whenever a class mainly holds data, such as a product, an order or a config. Options like `frozen=True` and `order=True` add immutability and sorting.",
  blocks: [
    { t: "h2", text: "Before and after" },
    {
      t: "code",
      run: true,
      code: "from dataclasses import dataclass\n\n@dataclass\nclass Product:\n    name: str\n    price: float\n    quantity: int = 0\n\nmug = Product(\"mug\", 8.5, 3)\nprint(mug)\nprint(mug.price * mug.quantity)\nprint(mug == Product(\"mug\", 8.5, 3))",
      output: "Product(name='mug', price=8.5, quantity=3)\n25.5\nTrue",
    },
    {
      t: "p",
      text: "Those few lines give you a constructor, a readable print-out and value comparison. Written by hand, the same class takes around 15 lines.",
    },
    { t: "h2", text: "Mutable defaults: default_factory" },
    {
      t: "code",
      run: true,
      code: "from dataclasses import dataclass, field\n\n@dataclass\nclass Order:\n    customer: str\n    items: list[str] = field(default_factory=list)\n\na = Order(\"Ana\")\nb = Order(\"Ben\")\na.items.append(\"tea\")\nprint(a)\nprint(b)",
      output: "Order(customer='Ana', items=['tea'])\nOrder(customer='Ben', items=[])",
    },
    {
      t: "note",
      tone: "warn",
      title: "Same trap as functions",
      text: "`items: list = []` would share one list between all orders, so dataclasses refuse it. `field(default_factory=list)` creates a fresh list for each object.",
    },
    { t: "h2", text: "Methods and computed values" },
    {
      t: "code",
      run: true,
      code: "from dataclasses import dataclass\n\n@dataclass\nclass Rectangle:\n    width: float\n    height: float\n\n    @property\n    def area(self) -> float:\n        return self.width * self.height\n\n    def scaled(self, factor: float) -> \"Rectangle\":\n        return Rectangle(self.width * factor, self.height * factor)\n\nr = Rectangle(2, 3)\nprint(r.area)\nprint(r.scaled(2))",
      output: "6\nRectangle(width=4, height=6)",
    },
    { t: "h2", text: "frozen and order" },
    {
      t: "code",
      run: true,
      code: 'from dataclasses import dataclass, FrozenInstanceError\n\n@dataclass(frozen=True, order=True)\nclass Version:\n    major: int\n    minor: int\n\nversions = [Version(3, 15), Version(3, 9), Version(2, 7)]\nprint(sorted(versions))\nprint(max(versions))\n\ntry:\n    versions[0].major = 4\nexcept FrozenInstanceError:\n    print("Can\'t change a frozen dataclass")',
      output:
        "[Version(major=2, minor=7), Version(major=3, minor=9), Version(major=3, minor=15)]\nVersion(major=3, minor=15)\nCan't change a frozen dataclass",
    },
    {
      t: "p",
      text: "`order=True` compares fields in order, like tuples. `frozen=True` makes objects read-only, so they're safe to share and can be used as dictionary keys.",
    },
    { t: "h2", text: "Converting to dictionaries" },
    {
      t: "code",
      run: true,
      code: 'from dataclasses import dataclass, asdict\nimport json\n\n@dataclass(slots=True)\nclass User:\n    name: str\n    email: str\n    active: bool = True\n\nuser = User("Ana", "ana@example.com")\nprint(asdict(user))\nprint(json.dumps(asdict(user)))',
      output:
        "{'name': 'Ana', 'email': 'ana@example.com', 'active': True}\n{\"name\": \"Ana\", \"email\": \"ana@example.com\", \"active\": true}",
    },
    {
      t: "p",
      text: "`asdict()` is the quick route to JSON. `slots=True` makes objects smaller and a little faster, and stops typos like `user.emial = ...` from silently creating new attributes.",
    },
  ],
  exercise: {
    prompt:
      "Create a dataclass `Book` with `title: str`, `pages: int` and `read: bool = False`. Make a list of three books — `Book(\"Dune\", 412)`, `Book(\"Atomic Habits\", 320, True)`, `Book(\"SPQR\", 608)` — then print the titles of unread books and, on a second line, their total pages.",
    starter: "from dataclasses import dataclass\n\n",
    expected: "['Dune', 'SPQR']\n1020",
    hints: [
      "Put `@dataclass` above `class Book:` and list the three fields with types.",
      "Filter with a comprehension: `[b for b in books if not b.read]`.",
      "Titles: `[b.title for b in unread]`; pages: `sum(b.pages for b in unread)`.",
    ],
    solution:
      'from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    pages: int\n    read: bool = False\n\nbooks = [Book("Dune", 412), Book("Atomic Habits", 320, True), Book("SPQR", 608)]\nunread = [b for b in books if not b.read]\nprint([b.title for b in unread])\nprint(sum(b.pages for b in unread))',
  },
  quiz: [
    {
      q: "Which methods does `@dataclass` write for you by default?",
      options: ["`__init__`, `__repr__`, `__eq__`", "Only `__init__`", "All possible methods"],
      answer: 0,
      why: "Those three come by default; `order=True` adds comparison methods.",
    },
    {
      q: "How do you give a dataclass field an empty list as default?",
      options: ["`items: list = []`", "`items: list = field(default_factory=list)`", "You can't"],
      answer: 1,
      why: "`default_factory` creates a new list for each object.",
    },
    {
      q: "What does `frozen=True` do?",
      options: ["Makes the class faster", "Prevents changing fields after creation", "Stores objects on disk"],
      answer: 1,
      why: "Frozen dataclasses are read-only.",
    },
  ],
  field: {
    title: "From the field",
    text: "Passing dataclasses between functions instead of loose dictionaries removes a whole family of bugs: misspelled keys fail immediately, editors autocomplete fields, and type checkers catch wrong types before anything runs.",
  },
  updated: "2026-11-19",
};

export default lesson;
