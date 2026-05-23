"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Category, Question } from "@/lib/types";
import { loadProgress } from "@/lib/storage";

type Props = {
  category: Category;
  questions: Question[];
};

export function CategoryCard({ category, questions }: Props) {
  const [stats, setStats] = useState({ solved: 0, mastered: 0 });

  useEffect(() => {
    const compute = () => {
      const { attempts } = loadProgress();
      let solved = 0;
      let mastered = 0;
      for (const q of questions) {
        const a = attempts[q.id];
        if (a?.solved) solved++;
        if (a?.mark === "mastered") mastered++;
      }
      setStats({ solved, mastered });
    };
    compute();
    const h = () => compute();
    window.addEventListener("rrq:progress-updated", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("rrq:progress-updated", h);
      window.removeEventListener("storage", h);
    };
  }, [questions]);

  const total = questions.length;
  const isMastered = stats.mastered === total;
  const progressPct = total === 0 ? 0 : Math.round((stats.solved / total) * 100);

  return (
    <Link
      href={`/quiz/${category.id}`}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:bg-white/[0.06] dark:hover:shadow-2xl dark:hover:shadow-black/30 ${category.ringClass}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${category.accentClass}`}
      />

      {isMastered && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-md shadow-amber-500/30">
          <span>🏆</span>
          <span>マスター</span>
        </div>
      )}

      <div className="relative">
        <div className="mb-3 flex items-start justify-between">
          <span className="text-3xl drop-shadow-sm">{category.emoji}</span>
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[10px] text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            {total} 問
          </span>
        </div>
        <h3 className="text-base font-bold text-zinc-900 transition-colors group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-white">
          {category.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {category.description}
        </p>

        {/* 進捗ミニバー */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>
            正解 {stats.solved} / {total}
            {stats.mastered > 0 && (
              <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                完璧 {stats.mastered}
              </span>
            )}
          </span>
          <span className="font-medium text-zinc-500 transition-colors group-hover:text-rose-600 dark:text-zinc-400 dark:group-hover:text-rose-300">
            挑戦する →
          </span>
        </div>
      </div>
    </Link>
  );
}
