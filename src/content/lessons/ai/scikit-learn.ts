import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "scikit-learn",
  path: "ai",
  title: "Machine learning with scikit-learn",
  description:
    "Your first machine learning models in Python with scikit-learn: features and labels, train/test split, fit and predict, accuracy and confusion matrix, pipelines with scaling, and regression.",
  minutes: 15,
  answer:
    "Machine learning means learning a rule from examples instead of writing it by hand. With scikit-learn the workflow is always the same: split data into training and test sets, `fit` a model on the training data, `predict` on the test data and measure how often it's right. Every model shares this `fit` / `predict` interface.",
  blocks: [
    { t: "h2", text: "Features and labels" },
    {
      t: "code",
      run: true,
      code: "from sklearn.datasets import load_iris\n\niris = load_iris()\nX, y = iris.data, iris.target\nprint(X.shape, y.shape)\nprint(iris.feature_names)\nprint(X[0], \"->\", iris.target_names[y[0]])",
      output:
        "(150, 4) (150,)\n['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']\n[5.1 3.5 1.4 0.2] -> setosa",
    },
    {
      t: "p",
      text: "`X` holds the features — the measurements the model can see, one row per flower. `y` holds the labels — the answer we want it to learn: which of three iris species it is.",
    },
    { t: "h2", text: "Train, predict, measure" },
    {
      t: "code",
      run: true,
      code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import accuracy_score\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, random_state=42, stratify=y\n)\n\nmodel = DecisionTreeClassifier(max_depth=3, random_state=42)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\n\nprint(len(X_train), \"train /\", len(X_test), \"test\")\nprint(\"accuracy:\", round(accuracy_score(y_test, predictions), 3))",
      output: "112 train / 38 test\naccuracy: 0.895",
    },
    {
      t: "list",
      items: [
        "Never measure a model on the data it learned from — that's like grading students on questions they've already seen.",
        "`random_state` makes the split and the model repeatable.",
        "`stratify=y` keeps the same mix of species in both sets.",
      ],
    },
    { t: "h2", text: "Where does it go wrong?" },
    {
      t: "code",
      run: true,
      code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import confusion_matrix\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\nmodel = DecisionTreeClassifier(max_depth=3, random_state=42).fit(X_train, y_train)\nprint(confusion_matrix(y_test, model.predict(X_test)))",
      output: "[[12  0  0]\n [ 0 12  1]\n [ 0  3 10]]",
    },
    {
      t: "p",
      text: "Rows are the true species, columns the predicted ones. Numbers on the diagonal are correct; anything else shows which species get confused with which.",
    },
    { t: "h2", text: "Pipelines: scaling plus a model" },
    {
      t: "code",
      run: true,
      code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\nX, y = load_iris(return_X_y=True)\npipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=500))\nscores = cross_val_score(pipe, X, y, cv=5)\nprint(scores.round(2))\nprint(\"mean accuracy:\", round(scores.mean(), 3))",
      output: "[0.97 1.   0.93 0.9  1.  ]\nmean accuracy: 0.96",
    },
    {
      t: "p",
      text: "A pipeline chains preparation steps and a model so they're always applied together, in the right order. Cross-validation trains and tests five times on different splits, giving a more honest score than a single split.",
    },
    { t: "h2", text: "Predicting numbers: regression" },
    {
      t: "code",
      run: true,
      code: "import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nsize_m2 = np.array([[50], [70], [90], [110], [130]])\nprice_k = np.array([210, 280, 355, 420, 500])\n\nreg = LinearRegression().fit(size_m2, price_k)\nprint(round(reg.coef_[0], 2), \"k per extra m2\")\nprint(round(reg.predict([[100]])[0]), \"k for 100 m2\")",
      output: "3.6 k per extra m2\n389 k for 100 m2",
    },
    {
      t: "note",
      tone: "tip",
      title: "Classical ML is still everywhere",
      text: "LLMs get the headlines, but fraud detection, demand forecasting, churn prediction and credit scoring mostly run on models like these: fast, cheap and easy to explain.",
    },
  ],
  exercise: {
    prompt:
      "Compute accuracy by hand. With `y_true = [0, 1, 1, 2, 2, 2, 0, 1]` and `y_pred = [0, 1, 2, 2, 2, 1, 0, 1]`, print how many predictions are correct, then the accuracy rounded to 3 decimals.",
    starter: "y_true = [0, 1, 1, 2, 2, 2, 0, 1]\ny_pred = [0, 1, 2, 2, 2, 1, 0, 1]\n",
    expected: "6\n0.75",
    hints: [
      "Walk both lists together with `zip(y_true, y_pred)`.",
      "`correct = sum(t == p for t, p in zip(y_true, y_pred))`",
      "Accuracy is `correct / len(y_true)`.",
    ],
    solution:
      "y_true = [0, 1, 1, 2, 2, 2, 0, 1]\ny_pred = [0, 1, 2, 2, 2, 1, 0, 1]\ncorrect = sum(t == p for t, p in zip(y_true, y_pred))\nprint(correct)\nprint(round(correct / len(y_true), 3))",
  },
  quiz: [
    {
      q: "Why keep a separate test set?",
      options: ["To train faster", "To measure performance on data the model hasn't seen", "It's required by scikit-learn"],
      answer: 1,
      why: "Scores on training data are overly optimistic.",
    },
    {
      q: "What do all scikit-learn models have in common?",
      options: ["They are neural networks", "The same `fit` and `predict` methods", "They need a GPU"],
      answer: 1,
      why: "The shared interface makes it easy to swap models.",
    },
    {
      q: "Predicting a house price is...",
      options: ["Classification", "Regression", "Clustering"],
      answer: 1,
      why: "Regression predicts numbers; classification predicts categories.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
