import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "rag-basics",
  path: "ai",
  title: "RAG basics: answer questions from your documents",
  description:
    "Retrieval-augmented generation explained with runnable Python: chunking documents, scoring relevance, retrieving the best chunks, building a grounded prompt, and moving to embeddings and vector databases.",
  minutes: 16,
  answer:
    "RAG (retrieval-augmented generation) lets an LLM answer from your own documents. You split documents into chunks, find the chunks most relevant to the question, and paste them into the prompt with an instruction to answer only from that context. The model then answers with your facts instead of guessing.",
  blocks: [
    { t: "h2", text: "The three steps" },
    {
      t: "table",
      head: ["Step", "What happens", "Typical tools"],
      rows: [
        ["1. Index", "Split documents into chunks and store them with a searchable representation", "Text splitters, embedding models, vector databases"],
        ["2. Retrieve", "Find the chunks most similar to the question", "Cosine similarity, keyword search, or both"],
        ["3. Generate", "Send the question plus those chunks to an LLM", "Any LLM API"],
      ],
    },
    {
      t: "p",
      text: "We'll build a tiny version in plain Python that runs in your browser, so every step is visible. Real systems swap in better parts but keep the same shape.",
    },
    { t: "h2", text: "Step 1: chunking" },
    {
      t: "code",
      run: true,
      code: 'handbook = """Holidays: employees get 25 paid holiday days per year. Unused days expire on 31 March.\nRemote work: you may work from home up to three days per week. Agree the days with your manager.\nExpenses: submit receipts within 30 days. Meals are reimbursed up to 25 euros per day when travelling.\nLaptops: request a new laptop through the IT portal. Replacements are every three years."""\n\nchunks = [line.strip() for line in handbook.splitlines() if line.strip()]\nfor i, c in enumerate(chunks):\n    print(i, c[:45] + "...")',
      output:
        "0 Holidays: employees get 25 paid holiday days ...\n1 Remote work: you may work from home up to thr...\n2 Expenses: submit receipts within 30 days. Mea...\n3 Laptops: request a new laptop through the IT ...",
    },
    {
      t: "p",
      text: "Each chunk should hold one idea and enough context to make sense on its own. Real documents are usually split into pieces of a few hundred words, often with a small overlap so sentences aren't cut in half.",
    },
    { t: "h2", text: "Step 2: retrieval" },
    {
      t: "code",
      run: true,
      code: 'import math\nimport re\nfrom collections import Counter\n\nchunks = [\n    "Holidays: employees get 25 paid holiday days per year. Unused days expire on 31 March.",\n    "Remote work: you may work from home up to three days per week. Agree the days with your manager.",\n    "Expenses: submit receipts within 30 days. Meals are reimbursed up to 25 euros per day when travelling.",\n    "Laptops: request a new laptop through the IT portal. Replacements are every three years.",\n]\nSTOP = {"the", "a", "to", "are", "is", "up", "per", "you", "your", "on", "with", "of", "how", "many", "can", "i", "do", "when", "get", "my", "from"}\n\ndef vectorise(text: str) -> Counter:\n    words = re.findall(r"[a-z]+", text.lower())\n    return Counter(w for w in words if w not in STOP)\n\ndef cosine(a: Counter, b: Counter) -> float:\n    dot = sum(a[w] * b[w] for w in a)\n    norm = math.sqrt(sum(v * v for v in a.values())) * math.sqrt(sum(v * v for v in b.values()))\n    return dot / norm if norm else 0.0\n\ndef retrieve(question: str, k: int = 1) -> list[tuple[float, str]]:\n    q = vectorise(question)\n    scored = [(round(cosine(q, vectorise(c)), 3), c) for c in chunks]\n    return sorted(scored, reverse=True)[:k]\n\nfor question in ["How many holiday days do I get?", "Can I work from home?", "When are meals reimbursed?"]:\n    score, best = retrieve(question)[0]\n    print(f"{score:.3f}  {best[:40]}...")',
      output:
        "0.612  Holidays: employees get 25 paid holiday ...\n0.548  Remote work: you may work from home up t...\n0.447  Expenses: submit receipts within 30 days...",
    },
    {
      t: "p",
      text: "Here each chunk becomes a bag of word counts and we compare them with cosine similarity — the same maths as in the NumPy lesson. It only matches exact words, though: \"vacation\" would not find \"holiday\".",
    },
    { t: "h2", text: "Step 3: a grounded prompt" },
    {
      t: "code",
      run: true,
      code: 'def build_prompt(question: str, context: list[str]) -> str:\n    sources = "\\n".join(f"[{i + 1}] {c}" for i, c in enumerate(context))\n    return (\n        "Answer the question using only the sources below. "\n        "Cite sources like [1]. If the answer isn\'t in the sources, say you don\'t know.\\n\\n"\n        f"Sources:\\n{sources}\\n\\nQuestion: {question}"\n    )\n\ncontext = ["Holidays: employees get 25 paid holiday days per year. Unused days expire on 31 March."]\nprint(build_prompt("How many holiday days do I get?", context))',
      output:
        "Answer the question using only the sources below. Cite sources like [1]. If the answer isn't in the sources, say you don't know.\n\nSources:\n[1] Holidays: employees get 25 paid holiday days per year. Unused days expire on 31 March.\n\nQuestion: How many holiday days do I get?",
    },
    {
      t: "list",
      items: [
        "\"Only the sources below\" keeps the model from mixing in guesses.",
        "Citations let users check the answer against the original text.",
        "Permission to say \"I don't know\" is the single best defence against made-up answers.",
      ],
    },
    { t: "h2", text: "Upgrading to embeddings" },
    {
      t: "code",
      file: "embeddings.py · run on your computer",
      code: 'import numpy as np\n\n# embed() calls an embedding model from your provider or a local library;\n# each text becomes a vector of hundreds of numbers that captures its meaning.\nchunk_vectors = np.array([embed(c) for c in chunks])\nchunk_vectors /= np.linalg.norm(chunk_vectors, axis=1, keepdims=True)\n\ndef retrieve(question: str, k: int = 3) -> list[str]:\n    q = embed(question)\n    q /= np.linalg.norm(q)\n    scores = chunk_vectors @ q            # cosine similarity with every chunk at once\n    best = np.argsort(scores)[::-1][:k]\n    return [chunks[i] for i in best]',
    },
    {
      t: "p",
      text: "Embeddings match meaning, so \"vacation allowance\" finds the holidays chunk. For thousands of documents, a vector database (pgvector, Chroma, Qdrant and others) stores the vectors and searches them quickly. Many production systems combine embedding search with keyword search for the best results.",
    },
    {
      t: "note",
      tone: "tip",
      title: "Test retrieval first",
      text: "When a RAG system gives a wrong answer, the cause is usually retrieval: the right chunk never reached the model. Keep a list of test questions with the chunk each one should find, and check retrieval before tuning prompts.",
    },
  ],
  exercise: {
    prompt:
      "Build the simplest retriever: score each chunk by how many words of the question it contains (lowercase, split on spaces), and print the best chunk for the question `\"when do laptops get replaced\"`.",
    starter:
      'chunks = [\n    "holidays expire on 31 march",\n    "remote work up to three days per week",\n    "laptops are replaced every three years",\n]\nquestion = "when do laptops get replaced"\n',
    expected: "laptops are replaced every three years",
    hints: [
      "Turn the question into a set of words: `set(question.split())`.",
      "A chunk's score is `len(q_words & set(chunk.split()))`.",
      "`max(chunks, key=score_function)` returns the best chunk.",
    ],
    solution:
      'chunks = [\n    "holidays expire on 31 march",\n    "remote work up to three days per week",\n    "laptops are replaced every three years",\n]\nquestion = "when do laptops get replaced"\nq_words = set(question.split())\nbest = max(chunks, key=lambda c: len(q_words & set(c.split())))\nprint(best)',
  },
  quiz: [
    {
      q: "What problem does RAG solve?",
      options: ["Makes models smaller", "Lets a model answer from your own, current documents", "Removes the need for prompts"],
      answer: 1,
      why: "Retrieved context gives the model facts it was never trained on.",
    },
    {
      q: "Why do embeddings beat word counting for retrieval?",
      options: ["They are faster to type", "They match meaning, not just exact words", "They don't need any model"],
      answer: 1,
      why: "\"Vacation\" and \"holiday\" end up close together as embeddings.",
    },
    {
      q: "A RAG answer is wrong. What should you check first?",
      options: ["The model's temperature", "Whether the right chunk was retrieved", "The font of the documents"],
      answer: 1,
      why: "If the right context never reached the model, no prompt can fix the answer.",
    },
  ],
  field: {
    title: "From the field",
    text: "Most enterprise AI assistants are RAG systems over policies, contracts or support tickets. The teams that succeed spend their time on clean documents, sensible chunking and a retrieval test set — not on the biggest model.",
  },
  updated: "2026-11-19",
};

export default lesson;
