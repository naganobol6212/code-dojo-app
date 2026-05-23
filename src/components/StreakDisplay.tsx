"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  streak: number;
};

export function StreakDisplay({ streak }: Props) {
  const heat =
    streak >= 10
      ? "🔥🔥"
      : streak >= 5
        ? "🔥"
        : streak >= 3
          ? "✨"
          : "";

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={streak}
        initial={{ scale: 0.6, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -8 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${
          streak >= 5
            ? "border-rose-500/40 bg-rose-500/15 text-rose-200"
            : streak >= 3
              ? "border-amber-500/40 bg-amber-500/15 text-amber-200"
              : "border-white/10 bg-white/5 text-zinc-400"
        }`}
      >
        {heat && <span className="text-sm leading-none">{heat}</span>}
        <span className="font-semibold tabular-nums">{streak}</span>
        <span className="opacity-70">streak</span>
      </motion.div>
    </AnimatePresence>
  );
}
