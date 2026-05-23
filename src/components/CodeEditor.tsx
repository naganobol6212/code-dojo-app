"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  questionId: string;
  placeholder?: string;
};

const KEY = (qid: string) => `rrq_code_${qid}`;

export function CodeEditor({ questionId, placeholder }: Props) {
  const [value, setValue] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);

  // 初期ロード
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY(questionId));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored !== null) setValue(stored);
    } catch {
      /* ignore */
    }
  }, [questionId]);

  // 自動保存 (デバウンス)
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        window.localStorage.setItem(KEY(questionId), value);
        setSavedAt(new Date().toLocaleTimeString("ja-JP"));
      } catch {
        /* ignore */
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [value, questionId]);

  // Tab キーでインデント挿入 (素のtextareaだと focus が外れるため)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = ref.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const before = value.slice(0, start);
      const after = value.slice(end);
      const indent = "  "; // 2 スペース
      const next = before + indent + after;
      setValue(next);
      // カーソル位置を復元
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + indent.length;
      });
    }
  };

  const handleClear = () => {
    if (!value || confirm("入力内容を消去します。よろしいですか？")) {
      setValue("");
    }
  };

  const lineCount = value.split("\n").length;

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-300 bg-zinc-950 text-zinc-100 shadow-sm dark:border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            your_solution.rb
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-zinc-500">
            {lineCount} 行
          </span>
          {savedAt && (
            <span className="font-mono text-[10px] text-emerald-400">
              ✓ 保存 {savedAt}
            </span>
          )}
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-400 transition hover:border-rose-400/40 hover:text-rose-300"
          >
            クリア
          </button>
        </div>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        placeholder={
          placeholder ??
          "# ここに自分の解答を書いてみてください\n# Tab キーでインデント、自動保存されます\n\ndef solve\n  # write here\nend"
        }
        className="block min-h-[14rem] w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
      />
      <div className="border-t border-white/10 bg-black/30 px-3 py-2 font-mono text-[10px] text-zinc-500">
        💾 自動保存 (LocalStorage) ・ ⇥ Tab=2スペース挿入 ・ 入力はあなたのブラウザのみ
      </div>
    </div>
  );
}
