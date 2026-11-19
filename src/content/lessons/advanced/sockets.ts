import type { Lesson } from "@/content/types";

const lesson: Lesson = {
  slug: "sockets",
  path: "advanced",
  title: "Sockets and networking",
  description:
    "Python socket programming: how TCP connections work, a simple echo server and client, handling several clients, a raw HTTP request, and when to use higher-level libraries instead.",
  minutes: 13,
  answer:
    "A socket is one end of a network connection. A server creates a socket, binds it to an address and port, listens and accepts connections; a client connects to that address and sends bytes. Python's `socket` module exposes this directly. For everyday web work you'll use libraries such as `httpx` or FastAPI, which are built on sockets.",
  blocks: [
    {
      t: "note",
      tone: "tip",
      title: "Run these on your computer",
      text: "Browsers don't give Python raw network access, so these examples run in a terminal. Open two terminal windows: one for the server, one for the client.",
    },
    { t: "h2", text: "How a TCP connection works" },
    {
      t: "table",
      head: ["Server", "Client"],
      rows: [
        ["`socket()` — create", "`socket()` — create"],
        ["`bind((host, port))` — claim an address", ""],
        ["`listen()` — wait for callers", ""],
        ["`accept()` — a client arrives", "`connect((host, port))` — call the server"],
        ["`recv()` / `sendall()`", "`sendall()` / `recv()`"],
        ["`close()`", "`close()`"],
      ],
    },
    {
      t: "p",
      text: "TCP guarantees that bytes arrive complete and in order. Data travels as `bytes`, so text is encoded with `.encode()` before sending and decoded with `.decode()` after receiving.",
    },
    { t: "h2", text: "An echo server" },
    {
      t: "code",
      file: "server.py",
      code: 'import socket\n\nHOST, PORT = "127.0.0.1", 5050\n\nwith socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:\n    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n    server.bind((HOST, PORT))\n    server.listen()\n    print(f"Listening on {HOST}:{PORT}")\n    conn, addr = server.accept()\n    with conn:\n        print("Connected by", addr[0])\n        while data := conn.recv(1024):\n            conn.sendall(data.upper())',
    },
    { t: "h2", text: "A client" },
    {
      t: "code",
      file: "client.py",
      code: 'import socket\n\nwith socket.create_connection(("127.0.0.1", 5050)) as client:\n    client.sendall("hello, server".encode())\n    reply = client.recv(1024).decode()\n    print("Server replied:", reply)',
    },
    {
      t: "code",
      file: "terminal",
      code: "$ python server.py            # terminal 1\nListening on 127.0.0.1:5050\nConnected by 127.0.0.1\n\n$ python client.py            # terminal 2\nServer replied: HELLO, SERVER",
    },
    {
      t: "list",
      items: [
        "`AF_INET` means IPv4 and `SOCK_STREAM` means TCP.",
        "`127.0.0.1` (localhost) is only reachable from your own computer — safe for experiments.",
        "`recv(1024)` returns up to 1024 bytes, and an empty result when the other side closes.",
        "`SO_REUSEADDR` lets you restart the server straight away without an \"address in use\" error.",
      ],
    },
    { t: "h2", text: "Serving several clients" },
    {
      t: "code",
      file: "multi_server.py",
      code: 'import socketserver\n\n\nclass UpperHandler(socketserver.StreamRequestHandler):\n    def handle(self) -> None:\n        for line in self.rfile:\n            self.wfile.write(line.upper())\n\n\nif __name__ == "__main__":\n    with socketserver.ThreadingTCPServer(("127.0.0.1", 5050), UpperHandler) as server:\n        print("Serving many clients on port 5050")\n        server.serve_forever()',
    },
    {
      t: "p",
      text: "`socketserver.ThreadingTCPServer` handles each client in its own thread, so one slow client doesn't block the others. For thousands of connections, `asyncio.start_server` does the same with coroutines.",
    },
    { t: "h2", text: "HTTP is just text over a socket" },
    {
      t: "code",
      file: "raw_http.py",
      code: 'import socket\n\nrequest = (\n    "GET / HTTP/1.1\\r\\n"\n    "Host: example.com\\r\\n"\n    "Connection: close\\r\\n\\r\\n"\n)\nwith socket.create_connection(("example.com", 80)) as s:\n    s.sendall(request.encode())\n    response = b""\n    while chunk := s.recv(4096):\n        response += chunk\nprint(response.split(b"\\r\\n")[0].decode())',
      output: "HTTP/1.1 200 OK",
    },
    {
      t: "note",
      tone: "warn",
      title: "In real projects, use a library",
      text: "Real HTTP needs TLS (HTTPS), redirects, timeouts and retries. Use `httpx` or `requests` to call APIs, and FastAPI to build them. Knowing what happens underneath helps you debug them.",
    },
  ],
  exercise: {
    prompt:
      "Servers must parse what arrives. Write `parse_request_line(line: str)` that splits an HTTP request line such as `\"GET /learn/?page=2 HTTP/1.1\"` into method, path and version, and returns them as a tuple. Print the result, then just the path without the query string (the part before `?`).",
    starter: 'def parse_request_line(line: str) -> tuple[str, str, str]:\n    ...\n\nline = "GET /learn/?page=2 HTTP/1.1"\n',
    expected: "('GET', '/learn/?page=2', 'HTTP/1.1')\n/learn/",
    hints: [
      "`line.split()` gives the three parts.",
      "`method, path, version = line.split()` then return them as a tuple.",
      'The path without query: `path.split("?")[0]`.',
    ],
    solution:
      'def parse_request_line(line: str) -> tuple[str, str, str]:\n    method, path, version = line.split()\n    return method, path, version\n\nline = "GET /learn/?page=2 HTTP/1.1"\nresult = parse_request_line(line)\nprint(result)\nprint(result[1].split("?")[0])',
  },
  quiz: [
    {
      q: "What does `server.accept()` do?",
      options: ["Sends data", "Waits for and returns a new client connection", "Closes the server"],
      answer: 1,
      why: "It blocks until a client connects, then returns a socket for that client.",
    },
    {
      q: "Why call `.encode()` before `sendall()`?",
      options: ["To encrypt it", "Sockets send bytes, not strings", "To compress it"],
      answer: 1,
      why: "Text must be turned into bytes (usually UTF-8) to travel over the network.",
    },
    {
      q: "What does an empty result from `recv()` mean?",
      options: ["Try again later", "The other side closed the connection", "The buffer is full"],
      answer: 1,
      why: "An empty bytes object signals the connection has ended.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
