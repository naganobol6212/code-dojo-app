"use client";

import Link from "next/link";
import type { RoadmapPhase, RoadmapStep } from "@/data/roadmap";
import type { StepStats } from "./stats";

type Props = {
  step: RoadmapStep;
  stats: StepStats;
  colors: PhaseColors;
};

export type PhaseColors = {
  border: string;
  bg: string;
  chip: string;
  dot: string;
};

export const PHASE_COLORS: Record<RoadmapPhase["color"], PhaseColors> = {
  emerald: {
    border: "border-emerald-300 dark:border-emerald-500/30",
    bg: "from-emerald-50 to-white dark:from-emerald-500/[0.08] dark:to-transparent",
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  sky: {
    border: "border-sky-300 dark:border-sky-500/30",
    bg: "from-sky-50 to-white dark:from-sky-500/[0.08] dark:to-transparent",
    chip: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  violet: {
    border: "border-violet-300 dark:border-violet-500/30",
    bg: "from-violet-50 to-white dark:from-violet-500/[0.08] dark:to-transparent",
    chip: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  amber: {
    border: "border-amber-300 dark:border-amber-500/30",
    bg: "from-amber-50 to-white dark:from-amber-500/[0.08] dark:to-transparent",
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  rose: {
    border: "border-rose-300 dark:border-rose-500/30",
    bg: "from-rose-50 to-white dark:from-rose-500/[0.08] dark:to-transparent",
    chip: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    dot: "bg-rose-500",
  },
};

export function StepCard({ step, stats, colors }: Props) {
  const completed = stats.status === "completed";
  const hasWeak = stats.weak > 0;

  return (
    <article
      id={step.id}
      className={`relative scroll-mt-20 overflow-hidden rounded-2xl border bg-gradient-to-br p-5 shadow-sm transition ${colors.border} ${colors.bg} ${hasWeak ? "ring-2 ring-amber-300/60 dark:ring-amber-400/40" : ""}`}
    >
      <span
        aria-hidden
        className={`absolute -left-[33px] top-6 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow-sm dark:border-zinc-900 sm:-left-[41px] ${
          completed ? "bg-emerald-500" : colors.dot
        }`}
      >
        {completed && (
          <span className="text-[8px] font-bold text-white">✓</span>
        )}
      </span>

      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden>
          {step.emoji}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${colors.chip}`}
            >
              Step {step.number}
            </span>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {step.title}
            </h3>
            <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-500">
              · 約 {step.estimateMinutes} 分
            </span>
            {hasWeak && (
              <span
                title="🔁 見直しマークが付いた問題があります"
                className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
              >
                🔁 {stats.weak} 問の弱点
              </span>
            )}
            {completed && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                ✓ 完了
              </span>
            )}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            {step.goal}
          </p>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
            <div
              className={`h-full transition-all duration-500 ${
                completed
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                  : "bg-gradient-to-r from-rose-400 to-fuchsia-400"
              }`}
              style={{ width: `${stats.percent}%` }}
            />
          </div>
          <p className="mt-1 font-mono text-[10px] text-zinc-500 dark:text-zinc-500">
            {stats.done} / {stats.total} 問完了 ({stats.percent}%)
          </p>
        </div>
      )}

      {/* ステップ完了時の振り返り誘導 */}
      {completed && (
        <div className="mt-3 rounded-lg border border-emerald-300/60 bg-emerald-50/80 px-3 py-2 text-[11px] text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/[0.08] dark:text-emerald-200">
          <span aria-hidden className="mr-1">🎉</span>
          このステップは完了済み。{" "}
          <Link
            href={`/journal/new?template=kpt`}
            className="font-semibold underline-offset-2 hover:underline"
          >
            KPT で振り返って学びを定着
          </Link>
          {" "}させるのがおすすめ。
        </div>
      )}

      <div className="mt-4 space-y-2">
        {step.items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group flex items-start gap-3 rounded-lg border border-zinc-200 bg-white/80 px-3 py-2 transition hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-rose-400/40"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900 group-hover:text-rose-600 dark:text-zinc-100 dark:group-hover:text-rose-300">
                {item.label}
              </p>
              {item.hint && (
                <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                  {item.hint}
                </p>
              )}
            </div>
            <span
              className="self-center text-zinc-400 transition group-hover:translate-x-1 group-hover:text-rose-500 dark:text-zinc-600 dark:group-hover:text-rose-400"
              aria-hidden
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
