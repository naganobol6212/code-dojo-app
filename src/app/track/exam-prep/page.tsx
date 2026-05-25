import Link from "next/link";
import { findTrack } from "@/data/tracks";
import { findCategory } from "@/data/categories";
import { questionsByCategory } from "@/data/all-questions";
import { findGuide } from "@/data/guides";
import {
  examGroups,
  examProfilesByGroup,
  type ExamProfile,
} from "@/data/exam-profiles";

export const dynamic = "force-static";

function ExamCard({ profile }: { profile: ExamProfile }) {
  const relatedCats = (profile.relatedCategoryIds ?? [])
    .map((id) => {
      const cat = findCategory(id);
      if (!cat) return null;
      const count = questionsByCategory(id).length;
      return { cat, count };
    })
    .filter((x): x is { cat: NonNullable<ReturnType<typeof findCategory>>; count: number } => x !== null);

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white/70 p-5 dark:border-white/10 dark:bg-zinc-900/60">
      <header className="flex items-start gap-3">
        <span className="text-3xl leading-none">{profile.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {profile.name}
            </h3>
            {profile.short && (
              <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {profile.short}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
            主催: {profile.vendor}
          </p>
        </div>
      </header>

      <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
        <div className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            受験料
          </dt>
          <dd className="mt-0.5 font-medium text-zinc-800 dark:text-zinc-100">
            {profile.fee}
          </dd>
        </div>
        <div className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            形式
          </dt>
          <dd className="mt-0.5 font-medium text-zinc-800 dark:text-zinc-100">
            {profile.format}
          </dd>
        </div>
        <div className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            合格点
          </dt>
          <dd className="mt-0.5 font-medium text-zinc-800 dark:text-zinc-100">
            {profile.passingScore}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          出題範囲
        </p>
        <ul className="space-y-0.5 text-sm text-zinc-700 dark:text-zinc-300">
          {profile.scope.map((s, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 rounded-lg border border-amber-200/60 bg-amber-50/60 px-3 py-2 text-xs text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
        <span className="font-semibold">対策ルート: </span>
        {profile.strategy}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <a
          href={profile.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-700 transition hover:border-rose-300 hover:text-rose-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-rose-500/50 dark:hover:text-rose-300"
        >
          公式ページ ↗
        </a>
        {relatedCats.length > 0 && (
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
            ↓ このサイト内の関連クイズ {relatedCats.length} カテゴリ
          </p>
        )}
      </div>

      {relatedCats.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {relatedCats.map(({ cat, count }) => (
            <Link
              key={cat.id}
              href={`/quiz/${cat.id}`}
              className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50/60 px-2 py-1 text-[11px] font-medium text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
              <span className="text-rose-400 dark:text-rose-300/70">({count})</span>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

export default function ExamPrepTrackPage() {
  const track = findTrack("exam-prep");
  if (!track) {
    return null;
  }

  const overviewGuide = findGuide("exam-prep-overview");

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
      {/* パンくず */}
      <div className="mb-6 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="hover:text-rose-600 hover:underline dark:hover:text-rose-300"
        >
          ホーム
        </Link>
        <span>›</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-200">
          {track.name}
        </span>
      </div>

      {/* ヒーロー */}
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{track.emoji}</span>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              Track
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {track.name}
            </h1>
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              主要な IT 試験・認定の『受験料 / 形式 / 合格点 / 範囲 / 対策ルート』を一覧。
              本サイトの関連カテゴリへ直接ジャンプして練習開始。
            </p>
          </div>
        </div>
        <p className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
          ⚠️ 受験料・形式・合格点は時期により変動します。 必ず公式ページで最新情報を確認してください。
        </p>
      </header>

      {/* ガイド導線 */}
      {overviewGuide && (
        <section className="mb-10">
          <Link
            href={`/guide/${overviewGuide.id}`}
            className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-rose-500/40"
          >
            <span className="text-3xl">{overviewGuide.emoji}</span>
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                参考書
              </p>
              <h3 className="mt-0.5 font-bold tracking-tight text-zinc-900 group-hover:text-rose-600 dark:text-zinc-100 dark:group-hover:text-rose-300">
                {overviewGuide.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {overviewGuide.subtitle}
              </p>
              <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-500">
                {overviewGuide.chapters.length} 章 · 約{" "}
                {overviewGuide.chapters.reduce((s, c) => s + c.readingMinutes, 0)} 分
              </p>
            </div>
            <span className="text-zinc-300 transition group-hover:translate-x-1 group-hover:text-rose-500 dark:text-zinc-600 dark:group-hover:text-rose-400">
              →
            </span>
          </Link>
        </section>
      )}

      {/* 試験プロフィール (グループ別) */}
      {examGroups.map((group) => {
        const profiles = examProfilesByGroup(group.id);
        if (profiles.length === 0) return null;
        return (
          <section key={group.id} className="mb-12 scroll-mt-24" id={`group-${group.id}`}>
            <div className={`mb-4 rounded-2xl bg-gradient-to-br ${group.accentClass} p-5`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{group.emoji}</span>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {group.name}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-200/80">
                    {group.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {profiles.map((p) => (
                <ExamCard key={p.id} profile={p} />
              ))}
            </div>
          </section>
        );
      })}

      <footer className="mt-12 rounded-xl border border-dashed border-zinc-300 bg-white/40 p-6 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
        <p className="text-sm text-zinc-700 dark:text-zinc-200">
          🎯 試験対策は『公式テキスト → 関連カテゴリで問題演習 → 模試で時間配分』 が王道。
        </p>
        <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
          本サイトのフラッシュカード・復習リマインダ機能で長期記憶に定着させましょう。
        </p>
      </footer>
    </div>
  );
}
