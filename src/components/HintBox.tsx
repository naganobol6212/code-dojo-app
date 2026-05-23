"use client";

import { useState } from "react";

type Props = {
  hints: string[];
  onHintReveal?: (index: number) => void;
};

export function HintBox({ hints, onHintReveal }: Props) {
  const [revealed, setRevealed] = useState(0);

  const handleReveal = () => {
    const next = revealed + 1;
    setRevealed(next);
    onHintReveal?.(next);
  };

  if (hints.length === 0) return null;

  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950/40">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
          💡 ヒント ({revealed} / {hints.length})
        </h3>
        {revealed < hints.length && (
          <button
            type="button"
            onClick={handleReveal}
            className="rounded-md bg-amber-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-amber-700"
          >
            {revealed === 0
              ? "ヒントを見る"
              : `次のヒント (${revealed + 1}段階目)`}
          </button>
        )}
      </div>

      {revealed === 0 ? (
        <p className="text-sm text-amber-800 dark:text-amber-300">
          わからない時はヒントを段階的に見られます。なるべく自力で考えてみてください。
        </p>
      ) : (
        <ol className="list-decimal space-y-2 pl-5 text-sm text-amber-900 dark:text-amber-100">
          {hints.slice(0, revealed).map((hint, i) => (
            <li key={i}>{hint}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
