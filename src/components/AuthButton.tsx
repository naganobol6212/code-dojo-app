"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/auth/context";
import { getMyProfile, PROFILE_UPDATED_EVENT } from "@/lib/profile";

/**
 * ヘッダー右側に置くサインインボタン / アバタードロップダウン。
 *
 * - Supabase 未設定なら何も描画しない (環境変数なしのデプロイでは UI に出ない)
 * - 未ログイン: 「ログイン」 ボタン
 * - ログイン中: アバター + ドロップダウン (ユーザー名 / 同期中表示 / ログアウト)
 */
export function AuthButton() {
  const { enabled, ready, user, syncing, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<{
    name: string;
    avatar: string | null;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  // 自分で設定したプロフィール (表示名 / アイコン) をヘッダーにも反映
  useEffect(() => {
    if (!enabled || !user) return;
    let cancelled = false;
    const load = async () => {
      const info = await getMyProfile();
      if (!cancelled && info) {
        setProfile({
          name: info.profile.displayName,
          avatar: info.profile.avatarUrl,
        });
      }
    };
    void load();
    const onUpdated = () => void load();
    window.addEventListener(PROFILE_UPDATED_EVENT, onUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener(PROFILE_UPDATED_EVENT, onUpdated);
    };
  }, [enabled, user]);

  if (!enabled || !ready) return null;

  if (!user) {
    return (
      <Link
        href="/auth/login"
        title="ログイン / 新規登録"
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-700 transition hover:border-rose-400 hover:text-rose-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-rose-400/60 dark:hover:text-rose-300"
      >
        <span>ログイン</span>
      </Link>
    );
  }

  const githubAvatar =
    (user.user_metadata?.avatar_url as string | undefined) ?? null;
  const githubHandle =
    (user.user_metadata?.user_name as string | undefined) ??
    (user.user_metadata?.preferred_username as string | undefined) ??
    user.email ??
    "user";
  const avatarUrl = profile?.avatar ?? githubAvatar;
  const handle = profile?.name ?? githubHandle;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title={`ログイン中: ${handle}`}
        className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-zinc-300 bg-white transition hover:border-rose-400 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-rose-400/60"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={handle}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-200">
            {handle[0]?.toUpperCase() ?? "U"}
          </span>
        )}
        {syncing && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-white bg-emerald-500 dark:border-zinc-900">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-zinc-900"
          >
            <div className="border-b border-zinc-200 px-3 py-2 dark:border-white/10">
              <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {handle}
              </p>
              {user.email && (
                <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </p>
              )}
            </div>
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-rose-50 hover:text-rose-700 dark:text-zinc-200 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
            >
              プロフィール設定
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                void signOut();
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-rose-50 hover:text-rose-700 dark:text-zinc-200 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
            >
              ログアウト
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
