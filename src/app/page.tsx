import Link from "next/link";
import { categories } from "@/data/categories";
import { questions, questionsByCategory } from "@/data/questions";
import { ProgressSummary } from "@/components/ProgressSummary";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          💎 Ruby on Rails クイズ
        </h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          初学者から上級者まで。文法・規約・ActiveRecord をクイズで身につけよう。
        </p>
      </header>

      <div className="mb-8">
        <ProgressSummary totalQuestions={questions.length} />
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">カテゴリを選ぶ</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((cat) => {
            const count = questionsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/quiz/${cat.id}`}
                className="group rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-blue-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {cat.name}
                  </h3>
                </div>
                <p className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {cat.description}
                </p>
                <p className="text-xs text-zinc-500">{count} 問</p>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="mt-12 text-center text-xs text-zinc-500">
        <p>
          MVP版 (文法クイズ + ヒント機能)。コーディングテストは今後追加予定。
        </p>
      </footer>
    </div>
  );
}
