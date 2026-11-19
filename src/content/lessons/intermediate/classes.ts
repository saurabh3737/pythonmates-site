import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "classes",
  path: "intermediate",
  title: "Classes and objects",
  description:
    "Python classes explained: __init__ and self, methods, __repr__, class attributes, inheritance with super(), properties and when a class is the right tool.",
  minutes: 14,
  answer:
    "A class is a blueprint that bundles data (attributes) and behaviour (methods); each object made from it is an instance. You define one with `class Name:`, set up its data in `__init__(self, ...)`, and reach that data through `self`. Classes are worth it when several functions keep working on the same piece of data.",
  blocks: [
    { t: "h2", text: "Your first class" },
    {
      t: "code",
      run: true,
      code: 'class BankAccount:\n    def __init__(self, owner: str, balance: float = 0) -> None:\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount: float) -> None:\n        self.balance += amount\n\n    def withdraw(self, amount: float) -> None:\n        if amount > self.balance:\n            raise ValueError("insufficient funds")\n        self.balance -= amount\n\n\naccount = BankAccount("Asha", 100)\naccount.deposit(50)\naccount.withdraw(30)\nprint(account.owner, account.balance)',
      output: "Asha 120",
    },
    {
      t: "list",
      items: [
        "`__init__` runs automatically when you create an object: `BankAccount(\"Asha\", 100)`.",
        "`self` is the object itself. `self.balance` is that account's own balance.",
        "Methods are functions inside the class; Python passes `self` for you.",
        "Class names use `CapWords`; methods and attributes use `snake_case`.",
      ],
    },
    { t: "h2", text: "A readable print-out with __repr__" },
    {
      t: "code",
      run: true,
      code: 'class Point:\n    def __init__(self, x: float, y: float) -> None:\n        self.x = x\n        self.y = y\n\n    def __repr__(self) -> str:\n        return f"Point(x={self.x}, y={self.y})"\n\n    def distance_to_origin(self) -> float:\n        return (self.x ** 2 + self.y ** 2) ** 0.5\n\np = Point(3, 4)\nprint(p)\nprint(p.distance_to_origin())',
      output: "Point(x=3, y=4)\n5.0",
    },
    {
      t: "p",
      text: "Without `__repr__`, printing an object shows something like `<__main__.Point object at 0x7f...>`. Methods with double underscores are \"dunder\" methods: hooks Python calls for you.",
    },
    { t: "h2", text: "Class attributes" },
    {
      t: "code",
      run: true,
      code: 'class Employee:\n    company = "PythonMates"     # shared by all instances\n    headcount = 0\n\n    def __init__(self, name: str) -> None:\n        self.name = name          # one per instance\n        Employee.headcount += 1\n\na = Employee("Ana")\nb = Employee("Ben")\nprint(a.company, b.company)\nprint(Employee.headcount)',
      output: "PythonMates PythonMates\n2",
    },
    { t: "h2", text: "Inheritance" },
    {
      t: "code",
      run: true,
      code: 'class Shape:\n    def __init__(self, name: str) -> None:\n        self.name = name\n\n    def area(self) -> float:\n        raise NotImplementedError\n\n    def describe(self) -> str:\n        return f"{self.name} with area {self.area():.1f}"\n\n\nclass Rectangle(Shape):\n    def __init__(self, width: float, height: float) -> None:\n        super().__init__("rectangle")\n        self.width = width\n        self.height = height\n\n    def area(self) -> float:\n        return self.width * self.height\n\n\nclass Circle(Shape):\n    def __init__(self, radius: float) -> None:\n        super().__init__("circle")\n        self.radius = radius\n\n    def area(self) -> float:\n        return 3.14159 * self.radius ** 2\n\n\nfor shape in [Rectangle(3, 4), Circle(1)]:\n    print(shape.describe())',
      output: "rectangle with area 12.0\ncircle with area 3.1",
    },
    {
      t: "p",
      text: "A subclass reuses everything from its parent and overrides what's different. `super().__init__(...)` runs the parent's setup. Keep hierarchies shallow — one or two levels is plenty.",
    },
    { t: "h2", text: "Properties: computed and protected attributes" },
    {
      t: "code",
      run: true,
      code: 'class Temperature:\n    def __init__(self, celsius: float) -> None:\n        self.celsius = celsius\n\n    @property\n    def fahrenheit(self) -> float:\n        return self.celsius * 9 / 5 + 32\n\n    @property\n    def celsius(self) -> float:\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value: float) -> None:\n        if value < -273.15:\n            raise ValueError("below absolute zero")\n        self._celsius = value\n\nt = Temperature(20)\nprint(t.fahrenheit)\nt.celsius = 30\nprint(t.fahrenheit)\ntry:\n    t.celsius = -300\nexcept ValueError as err:\n    print("Error:", err)',
      output: "68.0\n86.0\nError: below absolute zero",
    },
    {
      t: "note",
      tone: "tip",
      title: "Mostly storing data?",
      text: "If a class is mainly a bundle of fields, `@dataclass` writes `__init__`, `__repr__` and comparisons for you. That's the next lesson.",
    },
  ],
  exercise: {
    prompt:
      "Write a class `Counter` with a `count` attribute starting at 0, a method `increment(step=1)` that adds to it, and a `__repr__` that returns `Counter(count=N)`. Create one, increment it once by default and once by 5, then print it.",
    starter: "class Counter:\n    def __init__(self) -> None:\n        ...\n\n",
    expected: "Counter(count=6)",
    hints: [
      "In `__init__`, set `self.count = 0`.",
      "`def increment(self, step: int = 1) -> None: self.count += step`",
      'def __repr__(self) -> str: return f"Counter(count={self.count})"',
    ],
    solution:
      'class Counter:\n    def __init__(self) -> None:\n        self.count = 0\n\n    def increment(self, step: int = 1) -> None:\n        self.count += step\n\n    def __repr__(self) -> str:\n        return f"Counter(count={self.count})"\n\nc = Counter()\nc.increment()\nc.increment(5)\nprint(c)',
  },
  quiz: [
    {
      q: "What is `self`?",
      options: ["A keyword that makes a method private", "The object the method was called on", "The class itself"],
      answer: 1,
      why: "Python passes the instance as the first argument, named `self` by convention.",
    },
    {
      q: "What does `super().__init__()` do in a subclass?",
      options: ["Creates a new object", "Runs the parent class's setup", "Deletes the parent"],
      answer: 1,
      why: "It calls the parent's `__init__` so its attributes are set up too.",
    },
    {
      q: "Why add `__repr__`?",
      options: ["It's required", "To get a useful text version when printing or debugging", "To make the class faster"],
      answer: 1,
      why: "Readable object output makes logs and debugging much easier.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
