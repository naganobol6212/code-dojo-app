"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Question } from "@/lib/types";
import { recordAttempt } from "@/lib/storage";
import { HintBox } from "./HintBox";
import { CodeBlock } from "./CodeBlock";

type Props = {
  questions: Question[];
  categoryName: string;
};

type Status = "answering" | "correct" | "wrong";

const normalizeText = (s: string) =>
  s.trim().toLowerCase().replace(/\s+/g, " ");

export function QuizRunner({ questions, categoryName }: Props) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [textInput, setTextInput] = useState("");
  const [status, setStatus] = useState<Status>("answering");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [sessionSolved, setSessionSolved] = useState(0);

  const current = questions[index];
  const total = questions.length;

  const isCorrect = useMemo(() => {
    if (!current) return false;
    if (current.type === "choice") return choice === current.answerIndex;
    return current.answers.some(
      (a) => normalizeText(a) === normalizeText(textInput),
    );
  }, [current, choice, textInput]);

  if (!current) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="mb-3 text-xl font-bold">このカテゴリには問題がありません</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          ← トップに戻る
        </Link>
      </div>
    );
  }

  const handleSubmit = () => {
    if (current.type === "choice" && choice === null) return;
    if (current.type === "text" && textInput.trim() === "") return;

    setStatus(isCorrect ? "correct" : "wrong");
    recordAttempt(current.id, isCorrect, hintsUsed);
    if (isCorrect) setSessionSolved((n) => n + 1);
  };

  const handleNext = () => {
    setIndex((i) => i + 1);
    setChoice(null);
    setTextInput("");
    setStatus("answering");
    setHintsUsed(0);
  };

  const handleRetry = () => {
    setStatus("answering");
    setChoice(null);
    setTextInput("");
  };

  const isFinished = index >= total - 1 && status !== "answering";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← カテゴリ選択に戻る
        </Link>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {categoryName} ・ 問題 {index + 1} / {total} ・ 正解 {sessionSolved}
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${((index + (status !== "answering" ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <article className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {current.difficulty === "beginner"
              ? "初級"
              : current.difficulty === "intermediate"
                ? "中級"
                : "上級"}
          </span>
          <span className="text-xs text-zinc-500">{current.id}</span>
        </div>

        <h2 className="text-lg font-semibold leading-relaxed">
          {current.question}
        </h2>

        {current.code && <CodeBlock code={current.code} />}

        {current.type === "choice" ? (
          <div className="space-y-2">
            {current.choices.map((c, i) => {
              const isChosen = choice === i;
              const isAnswer = current.answerIndex === i;
              const showResult = status !== "answering";
              return (
                <button
                  key={i}
                  type="button"
                  disabled={showResult}
                  onClick={() => setChoice(i)}
                  className={[
                    "w-full rounded-md border px-4 py-3 text-left text-sm transition",
                    showResult && isAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-950/40"
                      : showResult && isChosen
                        ? "border-red-500 bg-red-50 dark:bg-red-950/40"
                        : isChosen
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
                          : "border-zinc-300 bg-white hover:border-blue-400 dark:border-zinc-700 dark:bg-zinc-900",
                  ].join(" ")}
                >
                  <span className="mr-2 font-mono text-zinc-500">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <code className="font-mono">{c}</code>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={status !== "answering"}
              placeholder="ここに答えを入力"
              className="w-full rounded-md border border-zinc-300 bg-white px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
        )}

        <HintBox
          hints={current.hints}
          onHintReveal={(n) => setHintsUsed(n)}
        />

        {status === "answering" ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              (current.type === "choice" && choice === null) ||
              (current.type === "text" && textInput.trim() === "")
            }
            className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:disabled:bg-zinc-700"
          >
            回答する
          </button>
        ) : (
          <div
            className={[
              "space-y-3 rounded-lg border p-4",
              status === "correct"
                ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/40"
                : "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950/40",
            ].join(" ")}
          >
            <p className="font-bold">
              {status === "correct" ? "🎉 正解！" : "❌ 不正解"}
            </p>
            <div>
              <p className="text-sm font-semibold">解説:</p>
              <p className="mt-1 text-sm leading-relaxed">
                {current.explanation}
              </p>
            </div>
            {current.type === "text" && (
              <p className="text-sm">
                <span className="font-semibold">想定解答例: </span>
                <code className="font-mono">{current.answers.join(" / ")}</code>
              </p>
            )}

            <div className="flex gap-2 pt-2">
              {status === "wrong" && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="rounded-md border border-zinc-400 px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  もう一度挑戦
                </button>
              )}
              {!isFinished ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  次の問題 →
                </button>
              ) : (
                <Link
                  href="/"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  終了してトップへ
                </Link>
              )}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
