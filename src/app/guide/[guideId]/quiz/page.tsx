import Link from "next/link";
import { notFound } from "next/navigation";
import { findGuide, guides } from "@/data/guides";
import { findQuestion } from "@/data/all-questions";
import { QuizRunner } from "@/components/QuizRunner";

export function generateStaticParams() {
  return guides.map((g) => ({ guideId: g.id }));
}

type Props = {
  params: Promise<{ guideId: string }>;
};

export default async function GuideQuizPage({ params }: Props) {
  const { guideId } = await params;
  const guide = findGuide(guideId);
  if (!guide) notFound();

  // 全章の comprehensionQuestionIds を順序保持で連結 + 重複除去
  const seen = new Set<string>();
  const questions = guide.chapters
    .flatMap((c) => c.comprehensionQuestionIds ?? [])
    .filter((qid) => {
      if (seen.has(qid)) return false;
      seen.add(qid);
      return true;
    })
    .map((qid) => findQuestion(qid))
    .filter((q): q is NonNullable<ReturnType<typeof findQuestion>> => !!q);

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-14 text-center">
        <div className="mb-6 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Link
            href="/"
            className="hover:text-rose-600 hover:underline dark:hover:text-rose-300"
          >
            ホーム
          </Link>
          <span>›</span>
          <Link
            href={`/guide/${guide.id}`}
            className="hover:text-rose-600 hover:underline dark:hover:text-rose-300"
          >
            {guide.title}
          </Link>
        </div>
        <p className="text-4xl">📭</p>
        <h1 className="mt-3 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          確認問題は準備中です
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          この参考書には章末確認問題がまだ紐づいていません。
        </p>
        <Link
          href={`/guide/${guide.id}`}
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-rose-300 hover:text-rose-700 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-rose-500/40"
        >
          ← 参考書に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
      {/* パンくず */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="hover:text-rose-600 hover:underline dark:hover:text-rose-300"
        >
          ホーム
        </Link>
        <span>›</span>
        <Link
          href="/guide"
          className="hover:text-rose-600 hover:underline dark:hover:text-rose-300"
        >
          Study Guide
        </Link>
        <span>›</span>
        <Link
          href={`/guide/${guide.id}`}
          className="hover:text-rose-600 hover:underline dark:hover:text-rose-300"
        >
          {guide.title}
        </Link>
        <span>›</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-200">
          確認問題
        </span>
      </div>

      <header className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          Guide Quiz
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {guide.emoji} {guide.title} — 確認問題
        </h1>
        <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
          この参考書に紐づいた {questions.length} 問を連続出題。
          各章末の理解度確認を一気に解いて長期記憶に定着させましょう。
        </p>
      </header>

      <QuizRunner
        questions={questions}
        categoryName={`${guide.title} 確認問題`}
        categoryEmoji={guide.emoji}
        categoryId={guide.id}
        backHref={`/guide/${guide.id}`}
        backLabel="参考書"
      />
    </div>
  );
}
