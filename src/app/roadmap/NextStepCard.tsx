"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NextStepHit } from "./stats";

type Props = {
  next: NextStepHit | null;
  /** 弱点 (review マーク有) ステップ数 — 表示時に副次的な誘導を出す */
  weakStepCount: number;
  /** 弱点フィルタを on にするコールバック */
  onShowWeak: () => void;
};

/**
 * 「次にやるステップ」推薦ヒーローカード。
 * - 進行中で最も進んだステップ or 最初の未着手ステップを 1 つ大きく表示
 * - クリックで該当ステップの最初の item に直接遷移
 * - 弱点ステップが存在する時は『弱点を優先する』導線を併設
 * - 全完了時はお祝い表示
 */
export function NextStepCard({ next, weakStepCount, onShowWeak }: Props) {
  if (!next) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border-2 border-emerald-300/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 dark:border-emerald-400/30 dark:from-emerald-950/30 dark:via-zinc-900/40 dark:to-teal-950/30"
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          🎉 Congratulations
        </p>
        <h2 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          ロードマップ完走！
        </h2>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          全ステップを完了しました。 ジャーナルで振り返りを書いて、
          学びを定着させましょう。
        </p>
        <Link
          href="/journal/new?template=kpt"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-700"
        >
          <span>📝 KPT で振り返る</span>
          <span aria-hidden>→</span>
        </Link>
      </motion.section>
    );
  }

  const { phase, step, stats } = next;
  const firstItem = step.items[0];
  const isInProgress = stats.status === "in-progress";

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border-2 border-rose-300/70 bg-gradient-to-br from-rose-50 via-white to-fuchsia-50 p-6 shadow-md dark:border-rose-400/30 dark:from-rose-950/30 dark:via-zinc-900/40 dark:to-fuchsia-950/30"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 text-7xl opacity-15">
        {step.emoji}
      </div>

      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          {isInProgress ? "▶ Continue · 続きから" : "🎯 Next up · 次にやる"}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="rounded-full bg-rose-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-700 dark:text-rose-300">
            Step {step.number}
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
            {phase.title.replace(/^Phase \d+ · /, "")}
          </span>
          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
            · 約 {step.estimateMinutes} 分
          </span>
        </div>
        <h2 className="mt-1.5 text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
          <span aria-hidden className="mr-1.5">
            {step.emoji}
          </span>
          {step.title}
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {step.goal}
        </p>

        {stats.total > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] text-zinc-600 dark:text-zinc-400">
              <span className="font-mono">
                {stats.done} / {stats.total} 問完了
              </span>
              <span className="font-mono">{stats.percent}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.percent}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-rose-500 to-fuchsia-500"
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {firstItem && (
            <Link
              href={firstItem.href}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-rose-500/30 transition hover:bg-rose-600"
            >
              <span>{isInProgress ? "続きから始める" : "このステップを始める"}</span>
              <span aria-hidden>→</span>
            </Link>
          )}
          <Link
            href={`#${step.id}`}
            className="inline-flex items-center gap-1 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 transition hover:border-rose-400 hover:text-rose-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-rose-400/40 dark:hover:text-rose-300"
          >
            ステップ詳細
          </Link>
          {weakStepCount > 0 && (
            <button
              type="button"
              onClick={onShowWeak}
              className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-800 transition hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:bg-amber-500/20"
              title="🔁 見直しマークが付いた問題を含むステップだけ表示"
            >
              <span aria-hidden>🔁</span>
              <span>弱点 {weakStepCount} ステップを優先する</span>
            </button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
