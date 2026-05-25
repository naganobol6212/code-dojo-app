"use client";

import type { RoadmapFilter } from "./stats";

type Props = {
  current: RoadmapFilter;
  onChange: (f: RoadmapFilter) => void;
  counts: Record<RoadmapFilter, number>;
};

const OPTIONS: {
  key: RoadmapFilter;
  label: string;
  emoji: string;
  tone: "neutral" | "rose" | "emerald" | "amber";
}[] = [
  { key: "all", label: "全部", emoji: "📚", tone: "neutral" },
  { key: "incomplete", label: "未完了", emoji: "▶", tone: "rose" },
  { key: "completed", label: "完了", emoji: "✓", tone: "emerald" },
  { key: "weak", label: "弱点", emoji: "🔁", tone: "amber" },
];

const TONES: Record<
  (typeof OPTIONS)[number]["tone"],
  { active: string; idle: string }
> = {
  neutral: {
    active:
      "border-zinc-400 bg-zinc-100 text-zinc-900 dark:border-zinc-500 dark:bg-zinc-700 dark:text-zinc-50",
    idle: "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-white/30 dark:hover:text-zinc-100",
  },
  rose: {
    active:
      "border-rose-400 bg-rose-500 text-white shadow-sm shadow-rose-500/30 dark:border-rose-400 dark:bg-rose-600",
    idle: "border-zinc-200 bg-white text-zinc-600 hover:border-rose-400 hover:text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-rose-400/60 dark:hover:text-rose-300",
  },
  emerald: {
    active:
      "border-emerald-400 bg-emerald-500 text-white shadow-sm shadow-emerald-500/30 dark:border-emerald-400 dark:bg-emerald-600",
    idle: "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-emerald-400/60 dark:hover:text-emerald-300",
  },
  amber: {
    active:
      "border-amber-400 bg-amber-500 text-white shadow-sm shadow-amber-500/30 dark:border-amber-400 dark:bg-amber-600",
    idle: "border-zinc-200 bg-white text-zinc-600 hover:border-amber-400 hover:text-amber-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-amber-400/60 dark:hover:text-amber-200",
  },
};

export function RoadmapFilters({ current, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        絞り込み
      </span>
      {OPTIONS.map((opt) => {
        const active = current === opt.key;
        const tone = TONES[opt.tone];
        const count = counts[opt.key];
        const disabled = opt.key === "weak" && count === 0;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            disabled={disabled}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${active ? tone.active : tone.idle}`}
          >
            <span aria-hidden>{opt.emoji}</span>
            <span>{opt.label}</span>
            <span
              className={`rounded-full px-1.5 py-px font-mono text-[10px] ${active ? "bg-white/25" : "bg-zinc-100 dark:bg-white/10"}`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
