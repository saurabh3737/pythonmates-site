import type { Lesson } from "@/content/types";

const app = `import os

import anthropic
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

app = FastAPI(title="Ask the Handbook")
client = anthropic.AsyncAnthropic()          # reads ANTHROPIC_API_KEY
MODEL = os.getenv("MODEL", "claude-sonnet-5-5")


class Question(BaseModel):
    text: str = Field(min_length=3, max_length=500)


class Answer(BaseModel):
    answer: str
    model: str


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/ask", response_model=Answer)
async def ask(question: Question) -> Answer:
    try:
        response = await client.messages.create(
            model=MODEL,
            max_tokens=400,
            system="Answer questions about Python briefly and accurately.",
            messages=[{"role": "user", "content": question.text}],
        )
    except anthropic.APIError as err:
        raise HTTPException(status_code=502, detail="The AI service is unavailable") from err
    return Answer(answer=response.content[0].text, model=MODEL)


@app.post("/ask/stream")
async def ask_stream(question: Question) -> StreamingResponse:
    async def tokens():
        async with client.messages.stream(
            model=MODEL,
            max_tokens=400,
            messages=[{"role": "user", "content": question.text}],
        ) as stream:
            async for text in stream.text_stream:
                yield text

    return StreamingResponse(tokens(), media_type="text/plain")`;

const lesson: Lesson = {
  slug: "fastapi-for-ai",
  path: "ai",
  title: "Build an AI API with FastAPI",
  description:
    "Turn Python AI code into a web API with FastAPI: routes, request validation with Pydantic, async endpoints that call an LLM, streaming responses, automatic docs, testing and deployment tips.",
  minutes: 16,
  answer:
    "FastAPI turns Python functions into web endpoints: decorate a function with `@app.post(\"/ask\")`, describe the request body with a Pydantic model, and FastAPI validates input, converts JSON and writes interactive API docs for you. Because it's async, one server can wait on many LLM calls at once, and it can stream answers token by token.",
  blocks: [
    { t: "h2", text: "Setup" },
    {
      t: "code",
      file: "terminal",
      code: 'uv init ask-api\ncd ask-api\nuv add "fastapi[standard]" anthropic',
    },
    { t: "h2", text: "The smallest app" },
    {
      t: "code",
      file: "hello.py",
      code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n\n@app.get("/greet/{name}")\ndef greet(name: str, excited: bool = False) -> dict:\n    message = f"Hello, {name}"\n    return {"message": message + ("!" if excited else ".")}',
    },
    {
      t: "code",
      file: "terminal",
      code: '$ uv run fastapi dev hello.py\n$ curl "http://127.0.0.1:8000/greet/Ana?excited=true"\n{"message":"Hello, Ana!"}',
    },
    {
      t: "list",
      items: [
        "`{name}` in the path becomes a function parameter; other parameters become query parameters (`?excited=true`).",
        "Type hints do real work here: FastAPI converts `\"true\"` to `True` and rejects bad values with a clear error.",
        "Open `http://127.0.0.1:8000/docs` for interactive documentation where you can try every endpoint.",
      ],
    },
    { t: "h2", text: "Validated request bodies" },
    {
      t: "code",
      run: true,
      code: 'from pydantic import BaseModel, Field, ValidationError\n\nclass Question(BaseModel):\n    text: str = Field(min_length=3, max_length=500)\n    language: str = "en"\n\nprint(Question(text="What is a decorator?"))\n\ntry:\n    Question(text="?")\nexcept ValidationError as err:\n    print(err.errors()[0]["msg"])',
      output: "text='What is a decorator?' language='en'\nString should have at least 3 characters",
    },
    {
      t: "p",
      text: "FastAPI runs exactly this validation on every request. Invalid input never reaches your function; the caller gets a `422` response explaining what's wrong. That also protects you from paying for LLM calls with empty or enormous inputs.",
    },
    { t: "h2", text: "An AI endpoint, with streaming" },
    { t: "code", file: "main.py", code: app },
    {
      t: "list",
      items: [
        "`async def` endpoints let the server handle other requests while one waits for the LLM.",
        "`AsyncAnthropic` is the async client; one shared client reuses connections.",
        "Errors from the AI provider become a clean `502` instead of a crash with a stack trace.",
        "`StreamingResponse` sends text as it arrives, which feels much faster to users.",
      ],
    },
    {
      t: "code",
      file: "terminal",
      code: '$ uv run fastapi dev main.py\n$ curl -X POST http://127.0.0.1:8000/ask \\\n    -H "Content-Type: application/json" \\\n    -d \'{"text": "What does enumerate() do?"}\'',
    },
    { t: "h2", text: "Testing endpoints" },
    {
      t: "code",
      file: "test_hello.py",
      code: 'from fastapi.testclient import TestClient\n\nfrom hello import app\n\nclient = TestClient(app)\n\n\ndef test_greet():\n    response = client.get("/greet/Ana", params={"excited": True})\n    assert response.status_code == 200\n    assert response.json() == {"message": "Hello, Ana!"}\n\n\ndef test_bad_query_value():\n    response = client.get("/greet/Ana", params={"excited": "maybe"})\n    assert response.status_code == 422',
    },
    {
      t: "p",
      text: "`TestClient` calls your app in memory, without starting a server. For endpoints that call an LLM, replace the client with a fake in tests so they're fast, free and repeatable.",
    },
    { t: "h2", text: "Before you deploy" },
    {
      t: "list",
      items: [
        "Keep secrets in environment variables on the hosting platform.",
        "Add rate limiting and authentication so strangers can't run up your AI bill.",
        "Set timeouts on LLM calls and a `max_tokens` limit on every request.",
        "Log requests and errors (never the API key), and set a spending alert with your AI provider.",
        "Run with `fastapi run main.py` (production mode) in a container, or on a platform such as Render, Fly.io, Railway or Cloud Run.",
      ],
    },
  ],
  exercise: {
    prompt:
      "Write the validation FastAPI would do, by hand. `validate_question(data: dict) -> list[str]` returns a list of error messages: `\"text is required\"` if the key is missing, `\"text is too short\"` if it has fewer than 3 characters, `\"text is too long\"` above 500. Print the result for `{}`, `{\"text\": \"hi\"}` and `{\"text\": \"What is RAG?\"}`.",
    starter: "def validate_question(data: dict) -> list[str]:\n    ...\n\n",
    expected: "['text is required']\n['text is too short']\n[]",
    hints: [
      'Start with `errors = []` and check `if "text" not in data:` first.',
      "Otherwise look at `len(data[\"text\"])` for the short and long cases.",
      "Return the list at the end; an empty list means valid.",
    ],
    solution:
      'def validate_question(data: dict) -> list[str]:\n    errors = []\n    if "text" not in data:\n        errors.append("text is required")\n    elif len(data["text"]) < 3:\n        errors.append("text is too short")\n    elif len(data["text"]) > 500:\n        errors.append("text is too long")\n    return errors\n\nprint(validate_question({}))\nprint(validate_question({"text": "hi"}))\nprint(validate_question({"text": "What is RAG?"}))',
  },
  quiz: [
    {
      q: "What does FastAPI return when a request body fails validation?",
      options: ["500 Internal Server Error", "422 with details of what's wrong", "200 with an empty body"],
      answer: 1,
      why: "Invalid input is rejected before your function runs.",
    },
    {
      q: "Why make LLM endpoints `async def`?",
      options: ["It's required by Pydantic", "The server can serve other requests while waiting for the model", "It makes the model smarter"],
      answer: 1,
      why: "LLM calls are slow I/O; async keeps the server responsive.",
    },
    {
      q: "Where do you see FastAPI's automatic interactive docs?",
      options: ["/docs", "/admin", "/help.html"],
      answer: 0,
      why: "FastAPI serves Swagger UI at /docs by default.",
    },
  ],
  field: {
    title: "From the field",
    text: "A FastAPI service in front of the LLM is how most companies roll out AI safely: one place to enforce authentication, rate limits, logging, cost controls and prompt versions — instead of API keys scattered across scripts.",
  },
  updated: "2026-11-19",
};

export default lesson;
