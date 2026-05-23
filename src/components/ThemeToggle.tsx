"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "ライトモードに切替" : "ダークモードに切替"}
      title={isDark ? "ライトモードに切替" : "ダークモードに切替"}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 shadow-sm transition active:scale-95 hover:border-rose-400 hover:text-rose-500 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-rose-400/60 dark:hover:text-rose-300"
    >
      <span className="text-base transition-transform group-hover:rotate-12">
        {isDark ? "☀" : "☾"}
      </span>
    </button>
  );
}
