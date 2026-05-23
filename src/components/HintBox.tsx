"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  hints: string[];
  onHintReveal?: (index: number) => void;
};

export function HintBox({ hints, onHintReveal }: Props) {
  const [revealed, setRevealed] = useState(0);

  if (hints.length === 0) return null;

  const handleReveal = () => {
    const next = revealed + 1;
    setRevealed(next);
    onHintReveal?.(next);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent">
      <div className="flex items-center justify-between gap-3 border-b border-amber-500/10 bg-amber-500/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            ヒント
          </span>
          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-200">
            {revealed} / {hints.length}
          </span>
        </div>
        {revealed < hints.length && (
          <button
            type="button"
            onClick={handleReveal}
            className="group/btn flex items-center gap-1.5 rounded-md bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-100 transition hover:bg-amber-500/30"
          >
            <span>
              {revealed === 0
                ? "ヒントを開く"
                : `次のヒント (${revealed + 1}段階目)`}
            </span>
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
              className="text-xs text-amber-200/70"
            >
              わからない時は段階的にヒントを開けます。
              なるべく自力で考えてから使ってみてください。
            </motion.p>
          ) : (
            <motion.ol
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {hints.slice(0, revealed).map((hint, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3 text-sm text-amber-50"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 font-mono text-[10px] text-amber-200">
                    {i + 1}
                  </span>
                  <span className="flex-1 leading-relaxed">{hint}</span>
                </motion.li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
