import type { Lesson } from "@/content/types";

const game = `import random
from dataclasses import dataclass

import pygame

WIDTH, HEIGHT = 480, 640
PLAYER_W, PLAYER_H = 50, 80
BLOCK_W, BLOCK_H = 60, 60
FPS = 60


@dataclass
class Box:
    x: float
    y: float
    w: int
    h: int


def collides(a: Box, b: Box) -> bool:
    """True when two rectangles overlap."""
    return a.x < b.x + b.w and b.x < a.x + a.w and a.y < b.y + b.h and b.y < a.y + a.h


def move_player(player: Box, direction: int, speed: float) -> None:
    """Move left (-1) or right (+1), staying inside the window."""
    player.x = min(max(player.x + direction * speed, 0), WIDTH - player.w)


def new_block() -> Box:
    return Box(random.randint(0, WIDTH - BLOCK_W), -BLOCK_H, BLOCK_W, BLOCK_H)


def main() -> None:
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Dodge — a PythonMates project")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 36)

    player = Box(WIDTH / 2 - PLAYER_W / 2, HEIGHT - PLAYER_H - 20, PLAYER_W, PLAYER_H)
    blocks = [new_block()]
    speed = 4.0
    score = 0
    running, game_over = True, False

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN and game_over and event.key == pygame.K_SPACE:
                blocks, speed, score, game_over = [new_block()], 4.0, 0, False

        if not game_over:
            keys = pygame.key.get_pressed()
            direction = keys[pygame.K_RIGHT] - keys[pygame.K_LEFT]
            move_player(player, direction, speed=7)

            for block in blocks:
                block.y += speed
            passed = [b for b in blocks if b.y > HEIGHT]
            score += len(passed)
            blocks = [b for b in blocks if b.y <= HEIGHT]
            if passed:
                blocks.append(new_block())
                speed += 0.3
            if score >= 5 * len(blocks) and len(blocks) < 4:
                blocks.append(new_block())

            game_over = any(collides(player, b) for b in blocks)

        screen.fill((15, 23, 42))
        pygame.draw.rect(screen, (255, 212, 59), (player.x, player.y, player.w, player.h), border_radius=8)
        for b in blocks:
            pygame.draw.rect(screen, (55, 118, 171), (b.x, b.y, b.w, b.h), border_radius=6)
        screen.blit(font.render(f"Score: {score}", True, (230, 238, 249)), (12, 10))
        if game_over:
            text = font.render("Crash! Press SPACE to restart", True, (248, 113, 113))
            screen.blit(text, text.get_rect(center=(WIDTH / 2, HEIGHT / 2)))

        pygame.display.flip()
        clock.tick(FPS)

    pygame.quit()


if __name__ == "__main__":
    main()`;

const lesson: Lesson = {
  slug: "pygame-game",
  path: "intermediate",
  title: "Project: build a dodge game with pygame",
  description:
    "Build a complete arcade game in Python with pygame-ce: a game window, the game loop, keyboard input, moving obstacles, collision detection, score and restart.",
  minutes: 25,
  answer:
    "A pygame game is a loop that runs about 60 times a second: read input, update positions, check collisions, then draw the frame. In this project you build Dodge — move a player left and right to avoid falling blocks — in about 100 lines, using classes, functions and everything else from the Intermediate path.",
  blocks: [
    { t: "h2", text: "What you'll build" },
    {
      t: "list",
      items: [
        "A window with a player at the bottom that moves with the arrow keys.",
        "Blocks that fall from the top, faster and more of them as your score grows.",
        "Collision detection, a score counter and a restart key.",
        "Clean structure: game rules in small pure functions you can test without a window.",
      ],
    },
    { t: "h2", text: "Setup" },
    {
      t: "p",
      text: "pygame opens a real window, so this project runs on your computer rather than in the browser. Use `pygame-ce`, the actively maintained community edition — your code still says `import pygame`.",
    },
    {
      t: "code",
      file: "terminal",
      code: "uv init dodge\ncd dodge\nuv add pygame-ce\nuv run python -c \"import pygame; print(pygame.version.ver)\"",
    },
    { t: "h2", text: "Step 1: the game rules, without graphics" },
    {
      t: "p",
      text: "Start with the logic. A `Box` dataclass describes anything rectangular, and `collides` checks whether two boxes overlap on both axes. Because it doesn't need pygame, you can run and test it right here.",
    },
    {
      t: "code",
      run: true,
      code: 'from dataclasses import dataclass\n\n@dataclass\nclass Box:\n    x: float\n    y: float\n    w: int\n    h: int\n\ndef collides(a: Box, b: Box) -> bool:\n    return a.x < b.x + b.w and b.x < a.x + a.w and a.y < b.y + b.h and b.y < a.y + a.h\n\nplayer = Box(100, 500, 50, 80)\nprint(collides(player, Box(120, 450, 60, 60)))   # overlapping\nprint(collides(player, Box(300, 450, 60, 60)))   # far to the right\nprint(collides(player, Box(150, 500, 60, 60)))   # just touching edges',
      output: "True\nFalse\nFalse",
    },
    {
      t: "note",
      tone: "tip",
      title: "Why separate logic from drawing?",
      text: "Pure functions like `collides` and `move_player` are easy to test with pytest and easy to change. The game loop then only glues input, rules and drawing together.",
    },
    { t: "h2", text: "Step 2: the game loop" },
    {
      t: "list",
      items: [
        "`pygame.event.get()` — handle closing the window and key presses.",
        "Update — move the player and the blocks, add score, speed up.",
        "Check — did the player hit a block? Then it's game over.",
        "Draw — clear the screen, draw shapes and text, then `pygame.display.flip()`.",
        "`clock.tick(60)` — wait so the game runs at 60 frames per second on every computer.",
      ],
    },
    { t: "h2", text: "Step 3: the complete game" },
    {
      t: "p",
      text: "Save this as `main.py` and run `uv run main.py`. Use the left and right arrow keys; press space to restart after a crash.",
    },
    { t: "code", file: "main.py", code: game },
    { t: "h2", text: "How it works" },
    {
      t: "list",
      items: [
        "`keys[pygame.K_RIGHT] - keys[pygame.K_LEFT]` gives `1`, `-1` or `0`: a neat way to get a direction from two keys.",
        "`move_player` uses `min(max(...))` to clamp the player inside the window.",
        "Blocks that leave the screen add to the score and are replaced by a new one, and the speed goes up a little each time.",
        "Shapes are drawn with `pygame.draw.rect`, so the game needs no image files.",
      ],
    },
    { t: "h2", text: "Ideas to extend it" },
    {
      t: "list",
      items: [
        "Save a high score to a file with `pathlib` (see Files and errors).",
        "Replace the rectangles with images using `pygame.image.load()`.",
        "Add sound with `pygame.mixer.Sound`.",
        "Write pytest tests for `collides` and `move_player`.",
        "Ask an AI assistant to explain one function you don't fully understand — then check its answer by changing the code.",
      ],
    },
  ],
  exercise: {
    prompt:
      "Write the game's `move_player` rule as a pure function: `clamp_x(x, step, width, player_w)` returns `x + step` but never less than 0 and never more than `width - player_w`. Print the results for `(100, 7, 480, 50)`, `(3, -7, 480, 50)` and `(428, 7, 480, 50)`.",
    starter: "def clamp_x(x: float, step: float, width: int, player_w: int) -> float:\n    ...\n\n",
    expected: "107\n0\n430",
    hints: [
      "Start with `new_x = x + step`.",
      "`max(new_x, 0)` stops it going below 0; `min(..., width - player_w)` stops it going too far right.",
      "return min(max(x + step, 0), width - player_w)",
    ],
    solution:
      "def clamp_x(x: float, step: float, width: int, player_w: int) -> float:\n    return min(max(x + step, 0), width - player_w)\n\nprint(clamp_x(100, 7, 480, 50))\nprint(clamp_x(3, -7, 480, 50))\nprint(clamp_x(428, 7, 480, 50))",
  },
  quiz: [
    {
      q: "What does `clock.tick(60)` do?",
      options: ["Ends the game after 60 seconds", "Limits the loop to about 60 frames per second", "Adds 60 points"],
      answer: 1,
      why: "It pauses just long enough to keep a steady frame rate.",
    },
    {
      q: "Two boxes overlap when...",
      options: ["Their x values are equal", "They overlap on both the x and y axes", "One is above the other"],
      answer: 1,
      why: "Rectangles collide only if their ranges overlap horizontally and vertically.",
    },
    {
      q: "Why is `pygame.display.flip()` needed?",
      options: ["To rotate the screen", "To show the frame you just drew", "To read the keyboard"],
      answer: 1,
      why: "Drawing happens off-screen; `flip()` displays the finished frame.",
    },
  ],
  updated: "2026-11-19",
};

export default lesson;
