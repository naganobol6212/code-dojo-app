import Link from "next/link";
import { tracks } from "@/data/tracks";
import { allQuestions as questions } from "@/data/all-questions";
import { guides } from "@/data/guides";
import { crudChallenges } from "@/data/crud-challenges";
import { ProgressSummary } from "@/components/ProgressSummary";
import { TrackPicker } from "@/components/TrackPicker";
import { JournalHomeCard } from "@/components/JournalHomeCard";
import { TodaysDashboard } from "@/components/TodaysDashboard";

export default function Home() {
  const availableTracks = tracks.filter((t) => t.status === "available").length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 sm:py-12">
      {/* ヒーロー (簡素化) */}
      <header className="mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500 dark:bg-rose-400" />
          <span>
            {questions.length} 問 · {availableTracks} Track
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Code<span className="text-rose-600 dark:text-rose-400">Dojo</span>
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
          複数の言語/FW を、 クイズ・参考書・ジャーナルで横断学習。
        </p>
      </header>

      {/* 今日のダッシュボード (動的「次の一手」 + 数字 + やりかけ) */}
      <div className="mb-8">
        <TodaysDashboard />
      </div>

      {/* セカンダリ CTA — グリッド (CRUD / 参考書 / ジャーナル) */}
      <section className="mb-10">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          📚 学習サイクル
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {/* 参考書 */}
          {guides.length > 0 && (
            <Link
              href="/guide"
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-amber-50/40 to-rose-50/40 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-md dark:border-white/10 dark:from-zinc-900/60 dark:via-amber-500/5 dark:to-rose-500/5 dark:hover:border-rose-500/40"
            >
              <span className="text-2xl">📖</span>
              <h3 className="mt-2 text-sm font-bold tracking-tight text-zinc-900 group-hover:text-rose-600 dark:text-zinc-100 dark:group-hover:text-rose-300">
                参考書で読む
              </h3>
              <p className="mt-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                {guides.length} ガイド · 計{" "}
                {guides.reduce((s, g) => s + g.chapters.length, 0)} 章
              </p>
            </Link>
          )}

          {/* CRUD 課題 */}
          {crudChallenges.length > 0 && (
            <Link
              href="/crud"
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-emerald-50/40 to-cyan-50/40 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-white/10 dark:from-zinc-900/60 dark:via-emerald-500/5 dark:to-cyan-500/5 dark:hover:border-emerald-500/40"
            >
              <span className="text-2xl">🛠️</span>
              <h3 className="mt-2 text-sm font-bold tracking-tight text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-300">
                CRUD 課題で作る
              </h3>
              <p className="mt-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                {crudChallenges.length} 課題 · 計{" "}
                {crudChallenges.reduce((s, c) => s + c.steps.length, 0)} ステップ
              </p>
            </Link>
          )}

          {/* フラッシュカード */}
          <Link
            href="/flashcards"
            className="group flex flex-col rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-purple-50/40 to-fuchsia-50/40 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md dark:border-white/10 dark:from-zinc-900/60 dark:via-purple-500/5 dark:to-fuchsia-500/5 dark:hover:border-purple-500/40"
          >
            <span className="text-2xl">📇</span>
            <h3 className="mt-2 text-sm font-bold tracking-tight text-zinc-900 group-hover:text-purple-700 dark:text-zinc-100 dark:group-hover:text-purple-300">
              フラッシュカード
            </h3>
            <p className="mt-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
              SM-2 間隔反復で長期記憶へ
            </p>
          </Link>
        </div>
      </section>

      {/* ジャーナル (言語化トレーニング) */}
      <div className="mb-10">
        <JournalHomeCard />
      </div>

      {/* 使い方ガイド */}
      <div className="mb-10">
        <Link
          href="/about"
          className="group flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/60 px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-sm dark:border-sky-500/30 dark:bg-sky-500/[0.07] dark:hover:border-sky-400/60"
        >
          <span className="text-xl" aria-hidden>
            💡
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-300">
              How to use
            </p>
            <p className="mt-0.5 text-[13px] font-medium text-zinc-800 dark:text-zinc-100">
              はじめての方は <strong>学習サイクル</strong> と{" "}
              <strong>各機能の使い方</strong> を 3 分でチェック
            </p>
          </div>
          <span
            className="text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-sky-500 dark:text-zinc-600 dark:group-hover:text-sky-300"
            aria-hidden
          >
            →
          </span>
        </Link>
      </div>

      {/* 進捗 (詳細) */}
      <div className="mb-12">
        <ProgressSummary totalQuestions={questions.length} />
      </div>

      {/* Track 選択 */}
      <section id="tracks" className="scroll-mt-20">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Track を選ぶ
          </h2>
          <p className="text-xs text-zinc-500">
            言語 / フレームワーク別の学習トラック
          </p>
        </div>
        <TrackPicker />
      </section>
    </div>
  );
}
