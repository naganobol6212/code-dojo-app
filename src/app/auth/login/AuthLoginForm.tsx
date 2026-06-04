"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";

type Mode = "signin" | "signup";

/**
 * メアド+パスワードのログイン/サインアップ + GitHub OAuth のページ。
 * メール確認 OFF 前提なのでサインアップ成功 = ログイン状態に遷移する。
 */
export function AuthLoginForm() {
  const router = useRouter();
  const { enabled, user, signInWithEmail, signUpWithEmail, signInWithGitHub } =
    useAuth();

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // 既にログイン済みならホームへ
  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  if (!enabled) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/40 p-8 text-center dark:border-white/10 dark:bg-zinc-900/30">
        <p className="text-3xl">🔒</p>
        <h1 className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          認証機能は無効です
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          このデプロイでは Supabase が未設定のため、 ログインできません。
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-xs font-semibold text-rose-600 dark:text-rose-300"
        >
          ホームへ戻る →
        </Link>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!email.trim() || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    if (mode === "signup" && password.length < 8) {
      setError("パスワードは 8 文字以上にしてください。");
      return;
    }
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      const { error: err } =
        mode === "signin"
          ? await signInWithEmail(email.trim(), password)
          : await signUpWithEmail(email.trim(), password);
      if (err) {
        // Supabase が返すよくあるエラーメッセージを日本語化
        const msg = translateAuthError(err, mode);
        setError(msg);
        return;
      }
      // 成功: useEffect が user を検出してホームへ遷移する
      setInfo(
        mode === "signin"
          ? "ログインしました。リダイレクトします…"
          : "登録が完了しました。リダイレクトします…",
      );
    } catch (e2) {
      console.error("[auth] submit error", e2);
      setError("予期せぬエラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setBusy(false);
    }
  };

  const onGitHub = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await signInWithGitHub();
      // signInWithOAuth はリダイレクトするのでこの後は実行されない
    } catch (e) {
      console.error("[auth] github error", e);
      setError("GitHub ログインを開始できませんでした。");
      setBusy(false);
    }
  };

  return (
    <>
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
          ログイン
        </span>
      </div>

      <header className="mb-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
          Sign in
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {mode === "signin" ? "ログイン" : "新規登録"}
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          ログインするとデバイス間で学習進捗が同期されます。
        </p>
      </header>

      {/* タブ */}
      <div className="mb-6 flex rounded-full border border-zinc-200 bg-zinc-50 p-1 dark:border-white/10 dark:bg-white/5">
        {(["signin", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
              setInfo(null);
            }}
            className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              mode === m
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {m === "signin" ? "ログイン" : "新規登録"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            パスワード
            {mode === "signup" && (
              <span className="ml-1 font-normal text-[10px] text-zinc-500">
                (8 文字以上)
              </span>
            )}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            required
            minLength={mode === "signup" ? 8 : undefined}
            placeholder="••••••••"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </p>
        )}
        {info && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-50"
        >
          {busy ? "送信中..." : mode === "signin" ? "ログイン" : "アカウントを作成"}
        </button>
      </form>

      {/* 区切り */}
      <div className="my-6 flex items-center gap-3 text-[11px] text-zinc-400">
        <span className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
        または
        <span className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
      </div>

      <button
        type="button"
        onClick={() => void onGitHub()}
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.08.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.86 2.33.66.07-.52.28-.86.5-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8a8 8 0 0 0-8-8Z" />
        </svg>
        GitHub で続ける
      </button>

      <p className="mt-6 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
        {mode === "signin" ? (
          <>
            アカウントが無い場合は{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="font-semibold text-rose-600 hover:underline dark:text-rose-300"
            >
              新規登録
            </button>
          </>
        ) : (
          <>
            すでにアカウントをお持ちの方は{" "}
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="font-semibold text-rose-600 hover:underline dark:text-rose-300"
            >
              ログイン
            </button>
          </>
        )}
      </p>
    </>
  );
}

/** Supabase の英語エラーメッセージを実用日本語に翻訳。 */
function translateAuthError(message: string, mode: Mode): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) {
    return "メールアドレスまたはパスワードが正しくありません。";
  }
  if (m.includes("email not confirmed")) {
    return "メールアドレスが未確認です。確認メールのリンクを踏んでください。";
  }
  if (m.includes("user already registered") || m.includes("already exists")) {
    return "このメールアドレスは既に登録されています。ログインしてください。";
  }
  if (m.includes("password should be at least")) {
    return "パスワードが短すぎます。設定された最低文字数を満たしてください。";
  }
  if (m.includes("rate limit") || m.includes("too many")) {
    return "リクエストが多すぎます。しばらく待って再度お試しください。";
  }
  if (m.includes("signups not allowed")) {
    return "新規登録が現在無効化されています。";
  }
  return `${mode === "signin" ? "ログイン" : "登録"}に失敗しました: ${message}`;
}
