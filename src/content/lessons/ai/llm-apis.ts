import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "llm-apis",
  path: "ai",
  title: "Calling LLM APIs from Python",
  description:
    "Use large language models from Python: API keys, messages and system prompts, tokens and cost, streaming, structured JSON output validated with Pydantic, retries and good habits for production.",
  minutes: 15,
  answer:
    "You call an LLM by sending a list of messages to the provider's API — with their Python SDK — and reading the text that comes back. Keep the API key in an environment variable, give clear instructions in a system prompt, ask for structured JSON when code needs to use the answer, validate it with Pydantic, and always handle timeouts and retries.",
  blocks: [
    { t: "h2", text: "Setup" },
    {
      t: "code",
      file: "terminal",
      code: 'uv add anthropic pydantic\nexport ANTHROPIC_API_KEY="sk-..."      # Windows PowerShell: $env:ANTHROPIC_API_KEY="sk-..."',
    },
    {
      t: "note",
      tone: "warn",
      title: "Never put keys in code",
      text: "Read keys from environment variables or a `.env` file that is listed in `.gitignore`. A key pushed to GitHub is usually found by scanners within minutes, and anyone can spend your money with it.",
    },
    { t: "h2", text: "Your first call" },
    {
      t: "code",
      file: "first_call.py · run on your computer",
      code: 'import anthropic\n\nclient = anthropic.Anthropic()          # reads ANTHROPIC_API_KEY\n\nresponse = client.messages.create(\n    model="claude-sonnet-5-5",\n    max_tokens=300,\n    system="You are a patient Python tutor. Answer in at most three sentences.",\n    messages=[{"role": "user", "content": "What is a list comprehension?"}],\n)\nprint(response.content[0].text)\nprint(response.usage.input_tokens, "in /", response.usage.output_tokens, "out tokens")',
    },
    {
      t: "list",
      items: [
        "`system` sets the role and rules; `messages` is the conversation so far.",
        "`max_tokens` caps the length of the answer — and the cost.",
        "Tokens are pieces of words (roughly ¾ of an English word each). You pay per token in and out.",
        "OpenAI, Google Gemini and other providers have very similar SDKs: a client, a model name and a list of messages. Check each provider's docs for current model names.",
      ],
    },
    { t: "h2", text: "Conversations are just lists" },
    {
      t: "code",
      run: true,
      code: 'messages = []\n\ndef add(role: str, text: str) -> None:\n    messages.append({"role": role, "content": text})\n\nadd("user", "Suggest a name for a Python study group.")\nadd("assistant", "How about \'The Indentation Club\'?")\nadd("user", "Make it shorter.")\n\nfor m in messages:\n    print(f"{m[\'role\']:>9}: {m[\'content\']}")\nprint(len(messages), "messages sent with the next request")',
      output:
        "     user: Suggest a name for a Python study group.\nassistant: How about 'The Indentation Club'?\n     user: Make it shorter.\n3 messages sent with the next request",
    },
    {
      t: "p",
      text: "The model has no memory between calls. To continue a conversation, you send the whole history every time — which is why long chats cost more and eventually need trimming or summarising.",
    },
    { t: "h2", text: "Streaming" },
    {
      t: "code",
      file: "stream.py · run on your computer",
      code: 'import anthropic\n\nclient = anthropic.Anthropic()\nwith client.messages.stream(\n    model="claude-sonnet-5-5",\n    max_tokens=400,\n    messages=[{"role": "user", "content": "Explain Python generators to a beginner."}],\n) as stream:\n    for text in stream.text_stream:\n        print(text, end="", flush=True)',
    },
    {
      t: "p",
      text: "Streaming shows words as they're generated, so users see an answer start within a second instead of waiting for the whole reply. Chat interfaces almost always stream.",
    },
    { t: "h2", text: "Structured output you can trust" },
    {
      t: "code",
      run: true,
      code: 'import json\nfrom pydantic import BaseModel, ValidationError\n\nclass Review(BaseModel):\n    sentiment: str\n    score: int\n    topics: list[str]\n\n# what the model returned when asked for JSON matching the Review schema\nreply = \'{"sentiment": "positive", "score": 4, "topics": ["delivery", "price"]}\'\nreview = Review.model_validate_json(reply)\nprint(review.sentiment, review.score, review.topics)\n\nbad_reply = \'{"sentiment": "positive", "score": "four"}\'\ntry:\n    Review.model_validate_json(bad_reply)\nexcept ValidationError as err:\n    print(err.error_count(), "problems found")\n\nprint(json.dumps(Review.model_json_schema()["required"]))',
      output: "positive 4 ['delivery', 'price']\n2 problems found\n[\"sentiment\", \"score\", \"topics\"]",
    },
    {
      t: "p",
      text: "When code needs to use an answer, ask for JSON that matches a schema and validate it. Pydantic turns the reply into a typed object, or tells you exactly what's wrong so you can retry. Most SDKs can also send the schema to the model directly.",
    },
    { t: "h2", text: "Retries and timeouts" },
    {
      t: "code",
      run: true,
      code: 'import random\nimport time\n\ndef call_with_retry(call, attempts: int = 4, base_delay: float = 0.01):\n    for attempt in range(1, attempts + 1):\n        try:\n            return call()\n        except TimeoutError:\n            if attempt == attempts:\n                raise\n            delay = base_delay * 2 ** attempt + random.uniform(0, base_delay)\n            print(f"attempt {attempt} timed out, retrying")\n            time.sleep(delay)\n\nresults = iter([TimeoutError(), TimeoutError(), "Here is your answer."])\n\ndef flaky_llm():\n    r = next(results)\n    if isinstance(r, Exception):\n        raise r\n    return r\n\nprint(call_with_retry(flaky_llm))',
      output: "attempt 1 timed out, retrying\nattempt 2 timed out, retrying\nHere is your answer.",
    },
    {
      t: "p",
      text: "LLM APIs are busy services: requests sometimes time out or get rate-limited. Retry with exponential back-off plus a little randomness. The official SDKs already retry common errors, and let you set `timeout` and `max_retries` on the client.",
    },
  ],
  exercise: {
    prompt:
      "Estimate cost before you call. Write `estimate_cost(input_tokens, output_tokens, in_price, out_price)` where prices are per million tokens, returning dollars. Print the cost of 12,000 input and 800 output tokens at $3 in / $15 out per million, rounded to 4 decimals, then the cost of 1,000 such calls rounded to 2 decimals.",
    starter: "def estimate_cost(input_tokens: int, output_tokens: int, in_price: float, out_price: float) -> float:\n    ...\n\n",
    expected: "0.048\n48.0",
    hints: [
      "Cost = tokens / 1,000,000 × price, for input and output separately.",
      "return input_tokens / 1_000_000 * in_price + output_tokens / 1_000_000 * out_price",
      "Then print(round(c, 4)) and print(round(c * 1000, 2)).",
    ],
    solution:
      "def estimate_cost(input_tokens: int, output_tokens: int, in_price: float, out_price: float) -> float:\n    return input_tokens / 1_000_000 * in_price + output_tokens / 1_000_000 * out_price\n\nc = estimate_cost(12_000, 800, 3, 15)\nprint(round(c, 4))\nprint(round(c * 1000, 2))",
  },
  quiz: [
    {
      q: "Where should an API key live?",
      options: ["In the Python file", "In an environment variable or an ignored .env file", "In the system prompt"],
      answer: 1,
      why: "Keys in code end up in git history and get leaked.",
    },
    {
      q: "Does the model remember your previous request?",
      options: ["Yes, always", "No — you send the conversation history each time", "Only for 24 hours"],
      answer: 1,
      why: "Each API call is independent; history is part of the request.",
    },
    {
      q: "Why validate JSON from a model with Pydantic?",
      options: ["To make it faster", "Models can return missing or wrong fields; validation catches it", "It's required by the API"],
      answer: 1,
      why: "Validation turns \"probably right\" into checked, typed data.",
    },
  ],
  field: {
    title: "From the field",
    text: "In real projects, the code that calls the model is usually the easy 10%. The other 90% is what's in this lesson: clear system prompts, validated outputs, retries, cost limits and logging what was asked and answered.",
  },
  updated: "2026-11-19",
};

export default lesson;
