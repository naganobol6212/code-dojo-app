"use client";

import type { RoadmapPhase } from "@/data/roadmap";
import type { PhaseStats } from "./stats";

type PhaseInfo = {
  phase: RoadmapPhase;
  stats: PhaseStats;
};

type Props = {
  phases: PhaseInfo[];
  /** Phase 見出し要素までスムーズスクロール */
  onJump: (phaseId: string) => void;
};

const COLOR_BG: Record<RoadmapPhase["color"], string> = {
  emerald: "from-emerald-400 to-teal-500",
  sky: "from-sky-400 to-cyan-500",
  violet: "from-violet-400 to-purple-500",
  amber: "from-amber-400 to-orange-500",
  rose: "from-rose-400 to-fuchsia-500",
};

const COLOR_BORDER: Record<RoadmapPhase["color"], string> = {
  emerald: "border-emerald-300 dark:border-emerald-500/30",
  sky: "border-sky-300 dark:border-sky-500/30",
  violet: "border-violet-300 dark:border-violet-500/30",
  amber: "border-amber-300 dark:border-amber-500/30",
  rose: "border-rose-300 dark:border-rose-500/30",
};

/**
 * Phase 別ミニ進捗バー — 全 Phase を横並びで一覧、 click で該当 Phase にジャンプ。
 * モバイルでは横スクロール可能。
 */
export function PhaseProgressBars({ phases, onJump }: Props) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/70 p-4 dark:border-white/10 dark:bg-zinc-900/40">
      <div className="mb-3 flex items-end justify-between gap-2">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          📊 Phase 別の進捗
        </h2>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
          バーをクリック → そのフェーズに移動
        </p>
      </div>

      <ol className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:grid sm:grid-cols-4 sm:gap-2 sm:overflow-visible lg:grid-cols-8">
        {phases.map(({ phase, stats }, i) => {
          const isCompleted =
            stats.total > 0 && stats.done === stats.total;
          return (
            <li
              key={phase.id}
              className="w-[120px] shrink-0 sm:w-auto"
            >
              <button
                type="button"
                onClick={() => onJump(phase.id)}
                aria-label={`${phase.title} に移動 (${stats.percent}% 完了)`}
                className={`group flex h-full w-full flex-col gap-1.5 rounded-xl border bg-white p-2.5 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900/60 ${COLOR_BORDER[phase.color]}`}
              >
                <div className="flex items-center justify-between gap-1 text-[10px]">
                  <span className="font-mono font-bold text-zinc-500 dark:text-zinc-400">
                    P{i + 1}
                  </span>
                  {stats.weak > 0 && (
                    <span
                      title={`🔁 見直しマーク ${stats.weak} 問`}
                      className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-px font-mono text-[9px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                    >
                      🔁{stats.weak}
                    </span>
                  )}
                  {isCompleted && !stats.weak && (
                    <span className="text-emerald-500" aria-hidden>
                      ✓
                    </span>
                  )}
                </div>
                <p className="line-clamp-2 text-[11px] font-semibold leading-tight text-zinc-900 group-hover:text-rose-600 dark:text-zinc-100 dark:group-hover:text-rose-300">
                  {phase.title.replace(/^Phase \d+ · /, "")}
                </p>
                <div className="mt-auto">
                  <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                    <div
                      className={`h-full bg-gradient-to-r transition-all duration-500 ${COLOR_BG[phase.color]}`}
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>
                  <p className="mt-1 flex items-baseline justify-between text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
                    <span>
                      {stats.completedSteps}/{stats.totalSteps} step
                    </span>
                    <span className="font-bold text-zinc-700 dark:text-zinc-200">
                      {stats.percent}%
                    </span>
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
