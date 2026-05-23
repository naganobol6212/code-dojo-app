"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  hints: string[];
  onHintReveal?: (index: number) => void;
};

// ヒント段階のラベル: 最終段階は『答えに近い』と明示する
const buttonLabelFor = (revealed: number, total: number) => {
  if (revealed === 0) return "ヒントを開く";
  if (revealed >= total - 1) return "決定的ヒント (答えに近い)";
  return `次のヒント (${revealed + 1}段階目)`;
};

export function HintBox({ hints, onHintReveal }: Props) {
  const [revealed, setRevealed] = useState(0);

  if (hints.length === 0) return null;

  const handleReveal = () => {
    const next = revealed + 1;
    setRevealed(next);
    onHintReveal?.(next);
  };

  // 最終段階を開こうとしている状態か？ (押すと最終が出る)
  const isAboutToRevealFinal = revealed === hints.length - 1;
  // 既に最終を開いてしまっているか？
  const finalRevealed = revealed === hints.length;

  return (
    <div className="overflow-hidden rounded-xl border border-amber-300/60 bg-gradient-to-br from-amber-50 to-white dark:border-amber-500/20 dark:from-amber-500/10 dark:via-amber-500/5 dark:to-transparent">
      <div className="flex items-center justify-between gap-3 border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-500/10 dark:bg-amber-500/5">
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            ヒント
          </span>
          <span className="rounded-full bg-amber-200/70 px-2 py-0.5 font-mono text-[10px] text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
            {revealed} / {hints.length}
          </span>
        </div>
        {!finalRevealed && (
          <button
            type="button"
            onClick={handleReveal}
            className={`group/btn flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white transition ${
              isAboutToRevealFinal
                ? "bg-rose-500 hover:bg-rose-400 dark:bg-rose-500/40 dark:hover:bg-rose-500/55"
                : "bg-amber-500 hover:bg-amber-400 dark:bg-amber-500/20 dark:text-amber-100 dark:hover:bg-amber-500/30"
            }`}
          >
            <span>{buttonLabelFor(revealed, hints.length)}</span>
            <span className="transition-transform group-hover/btn:translate-x-0.5">
              →
            </span>
          </button>
        )}
      </div>

      <div className="px-4 py-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {revealed === 0 ? (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-amber-800/80 dark:text-amber-200/70"
            >
              わからない時は段階的にヒントを開けます。
              最後のヒントは答えに近い内容なので、なるべく自力で考えてから開きましょう。
            </motion.p>
          ) : (
            <motion.ol
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {hints.slice(0, revealed).map((hint, i) => {
                const isFinal = i === hints.length - 1;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex gap-3 text-sm ${
                      isFinal
                        ? "text-rose-900 dark:text-rose-100"
                        : "text-amber-900 dark:text-amber-50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] ${
                        isFinal
                          ? "bg-rose-300 text-rose-900 dark:bg-rose-500/30 dark:text-rose-100"
                          : "bg-amber-200 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200"
                      }`}
                    >
                      {isFinal ? "！" : i + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">
                      {isFinal && (
                        <span className="mr-1.5 font-semibold text-rose-700 dark:text-rose-300">
                          [答えに近い]
                        </span>
                      )}
                      {hint}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
