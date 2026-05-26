import Link from "next/link";
import { notFound } from "next/navigation";
import { findGuide, guides } from "@/data/guides";
import { findQuestion } from "@/data/all-questions";
import { QuizRunner } from "@/components/QuizRunner";

export function generateStaticParams() {
  return guides.flatMap((g) =>
    g.chapters.flatMap((c) =>
      (c.comprehensionQuestionIds ?? []).map((qid) => ({
        guideId: g.id,
        chapterId: c.id,
        questionId: qid,
      })),
    ),
  );
}

type Props = {
  params: Promise<{
    guideId: string;
    chapterId: string;
    questionId: string;
  }>;
};

export default async function ChapterQuizPage({ params }: Props) {
  const { guideId, chapterId, questionId } = await params;
  const guide = findGuide(guideId);
  if (!guide) notFound();
  const chapter = guide.chapters.find((c) => c.id === chapterId);
  if (!chapter) notFound();

  const qids = chapter.comprehensionQuestionIds ?? [];
  const questions = qids
    .map((id) => findQuestion(id))
    .filter((q): q is NonNullable<ReturnType<typeof findQuestion>> => !!q);

  const startIndex = questions.findIndex((q) => q.id === questionId);
  if (startIndex === -1) notFound();

  const chapterHref = `/guide/${guide.id}/${chapter.id}`;

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
        <Link
          href={chapterHref}
          className="hover:text-rose-600 hover:underline dark:hover:text-rose-300"
        >
          {chapter.title}
        </Link>
        <span>›</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-200">
          理解度確認
        </span>
      </div>

      <header className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          Chapter Quiz
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {chapter.title} — 理解度確認
        </h1>
        <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
          この章に紐づいた {questions.length} 問。 章で学んだ知識をその場で定着させましょう。
        </p>
      </header>

      <QuizRunner
        questions={questions}
        categoryName={`${chapter.title} — 章末確認`}
        categoryEmoji={guide.emoji}
        categoryId={chapter.id}
        startIndex={startIndex}
        backHref={chapterHref}
        backLabel="章に戻る"
      />
    </div>
  );
}
