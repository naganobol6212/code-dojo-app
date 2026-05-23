"use client";

import { useSyncExternalStore, useState } from "react";
import { loadProgress, resetProgress } from "@/lib/storage";
import type { Progress } from "@/lib/types";

type Props = {
  totalQuestions: number;
};

const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

export function ProgressSummary({ totalQuestions }: Props) {
  const [reloadTick, setReloadTick] = useState(0);
  const progress = useSyncExternalStore<Progress | null>(
    subscribe,
    () => {
      void reloadTick;
      return loadProgress();
    },
    () => null,
  );

  if (!progress) {
    return (
      <div className="h-24 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm text-zinc-500">読み込み中...</p>
      </div>
    );
  }

  const solvedRate =
    totalQuestions === 0
      ? 0
      : Math.round((progress.totalSolved / totalQuestions) * 100);
  const accuracy =
    progress.totalAttempts === 0
      ? 0
      : Math.round((progress.totalSolved / progress.totalAttempts) * 100);

  const handleReset = () => {
    if (confirm("進捗をリセットします。よろしいですか？")) {
      resetProgress();
      setReloadTick((n) => n + 1);
    }
  };

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">あなたの進捗</h2>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-zinc-500 hover:text-red-600 hover:underline"
        >
          リセット
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat
          label="完答した問題"
          value={`${progress.totalSolved} / ${totalQuestions}`}
        />
        <Stat label="正解率" value={`${accuracy}%`} />
        <Stat label="進捗" value={`${solvedRate}%`} />
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${solvedRate}%` }}
        />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-bold tabular-nums">{value}</p>
    </div>
  );
}
