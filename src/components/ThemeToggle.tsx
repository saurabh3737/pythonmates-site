"use client";

import { Moon, Sun } from "lucide-react";

import { THEME_KEY } from "@/lib/theme";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked: the switch still works for this page */
    }
  }

  // Both icons are rendered; CSS shows the right one, so server and browser HTML match.
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Switch between light and dark theme" title="Switch theme">
      <span className="i-sun">
        <Sun size={18} />
      </span>
      <span className="i-moon">
        <Moon size={18} />
      </span>
    </button>
  );
}
