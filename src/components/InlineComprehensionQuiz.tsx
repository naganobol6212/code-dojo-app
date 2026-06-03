"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { findQuestion } from "@/data/all-questions";
import { findCategory } from "@/data/categories";
import { getAttempt, recordAttempt, setReviewMark } from "@/lib/storage";
import type { ChoiceQuestion, ReviewMark } from "@/lib/types";

type Props = {
  /** 章末で出題する問題 ID の配列 (comprehensionQuestionIds) */
  questionIds: string[];
  /** 戻り導線 (使う側で参考書 URL を渡す) */
  backHref?: string;
};

/**
 * 参考書ページ内で完結する『理解度確認クイズ』。
 *
 * - 各問題はカードで折りたたみ表示。開くと選択肢が出て、その場で回答できる。
 * - 回答すると LocalStorage に attempt が記録され、進捗統計とも連動する。
 * - 詳細解説は /quiz/[category]/[id] へ遷移するリンクを残す。
 * - choice 型以外の問題はカード内では扱えないため、詳細ページへのリンクだけ示す。
 */
export function InlineComprehensionQuiz({ questionIds, backHref }: Props) {
  // 0 件なら何も描画しない (呼び出し側で section ごと隠す想定だが念のため)
  if (questionIds.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-3 text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        🧪 理解度確認クイズ
      </h2>
      <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
        各問題を開いて、その場で回答できます。回答は学習進捗に記録されます。
      </p>
      <ol className="space-y-3">
        {questionIds.map((qid, i) => (
          <InlineQuestion key={qid} questionId={qid} number={i + 1} backHref={backHref} />
        ))}
      </ol>
    </section>
  );
}

function InlineQuestion({
  questionId,
  number,
  backHref,
}: {
  questionId: string;
  number: number;
  backHref?: string;
}) {
  const q = findQuestion(questionId);
  // attempt 状態: 初期表示時 / 回答後の表示 / マーク更新時 に再読込
  const [attempt, setAttempt] = useState(() => getAttempt(questionId));
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onUpdated = () => setAttempt(getAttempt(questionId));
    window.addEventListener("rrq:progress-updated", onUpdated);
    return () => window.removeEventListener("rrq:progress-updated", onUpdated);
  }, [questionId]);

  if (!q) return null;
  const cat = findCategory(q.categoryId);
  const isChoice = q.type === "choice";
  const solved = attempt?.solved === true;

  const onSelect = (idx: number) => {
    if (revealed || !isChoice) return;
    setSelected(idx);
    setRevealed(true);
    const cq = q as ChoiceQuestion;
    const correct = idx === cq.answerIndex;
    recordAttempt(q.id, correct, 0, 0);
  };

  const onRetry = () => {
    setSelected(null);
    setRevealed(false);
  };

  const onMark = (mark: ReviewMark) => {
    const next = attempt?.mark === mark ? null : mark;
    setReviewMark(q.id, next);
  };

  const choiceQuestion = isChoice ? (q as ChoiceQuestion) : null;
  const isCorrect = revealed && choiceQuestion && selected === choiceQuestion.answerIndex;

  return (
    <li className="overflow-hidden rounded-xl border border-zinc-200 bg-white/70 dark:border-white/10 dark:bg-zinc-900/60">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
      >
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-mono text-[11px] text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
          {number}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm text-zinc-800 dark:text-zinc-100">
            {q.question}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 font-mono dark:bg-white/10">
              {q.difficulty}
            </span>
            {cat && (
              <span>
                · {cat.emoji} {cat.name}
              </span>
            )}
            {solved && (
              <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                ✓ 正解済
              </span>
            )}
            {attempt?.mark === "review" && (
              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                🔁 見直し
              </span>
            )}
          </span>
        </span>
        <span className="shrink-0 text-zinc-400" aria-hidden="true">
          {open ? "▾" : "▸"}
        </span>
      </button>

      {open && (
        <div className="border-t border-zinc-100 px-4 py-4 dark:border-white/5">
          {/* コード例 (あれば) */}
          {q.code && (
            <pre className="mb-3 overflow-x-auto rounded-lg bg-zinc-50 p-3 text-[12px] leading-relaxed text-zinc-800 dark:bg-white/[0.03] dark:text-zinc-200">
              <code>{q.code}</code>
            </pre>
          )}

          {/* 選択肢 (choice 型のみ) */}
          {choiceQuestion ? (
            <>
              <ul className="space-y-2">
                {choiceQuestion.choices.map((c, idx) => {
                  const isAnswer = idx === choiceQuestion.answerIndex;
                  const isPicked = selected === idx;
                  const showColor = revealed && (isAnswer || isPicked);
                  return (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => onSelect(idx)}
                        disabled={revealed}
                        className={`block w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                          showColor && isAnswer
                            ? "border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100"
                            : showColor && isPicked
                              ? "border-rose-400 bg-rose-50 text-rose-900 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-100"
                              : revealed
                                ? "cursor-default border-zinc-200 bg-white text-zinc-500 dark:border-white/10 dark:bg-transparent dark:text-zinc-500"
                                : "border-zinc-200 bg-white text-zinc-800 hover:border-rose-300 hover:bg-rose-50/40 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:border-rose-500/40"
                        }`}
                      >
                        <span className="mr-2 font-mono text-xs text-zinc-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {c}
                        {revealed && isAnswer && (
                          <span className="ml-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                            ✓ 正解
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {revealed && (
                <div
                  className={`mt-4 rounded-lg border-l-4 px-3 py-2 text-sm ${
                    isCorrect
                      ? "border-emerald-400 bg-emerald-50/60 dark:border-emerald-500/40 dark:bg-emerald-500/5"
                      : "border-rose-400 bg-rose-50/60 dark:border-rose-500/40 dark:bg-rose-500/5"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {isCorrect ? "🎉 正解" : "❌ 不正解"} — 解説
                  </p>
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed text-zinc-700 dark:text-zinc-200">
                    {q.explanation.summary}
                  </p>
                </div>
              )}

              {revealed && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={onRetry}
                    className="rounded-md border border-zinc-300 bg-white px-2.5 py-1 font-medium text-zinc-700 hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                  >
                    🔄 もう一度
                  </button>
                  <button
                    type="button"
                    onClick={() => onMark("mastered")}
                    className={`rounded-md border px-2.5 py-1 font-medium transition ${
                      attempt?.mark === "mastered"
                        ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                    }`}
                  >
                    ✓ 完璧
                  </button>
                  <button
                    type="button"
                    onClick={() => onMark("review")}
                    className={`rounded-md border px-2.5 py-1 font-medium transition ${
                      attempt?.mark === "review"
                        ? "border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-300"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400 hover:text-amber-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                    }`}
                  >
                    🔁 見直し
                  </button>
                  <Link
                    href={`/quiz/${q.categoryId}/${q.id}${backHref ? `?back=${encodeURIComponent(backHref)}` : ""}`}
                    className="ml-auto rounded-md border border-zinc-300 bg-white px-2.5 py-1 font-medium text-zinc-700 hover:border-rose-300 hover:text-rose-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                  >
                    📖 詳しい解説・ヒント →
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 px-3 py-3 text-sm dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-300">
              <p className="text-zinc-600 dark:text-zinc-400">
                この問題は文章/実装形式のため、専用ページで挑戦してください。
              </p>
              <Link
                href={`/quiz/${q.categoryId}/${q.id}`}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-300"
              >
                問題ページを開く →
              </Link>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
