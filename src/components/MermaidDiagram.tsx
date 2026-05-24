"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

type Props = {
  /** Mermaid のソース (flowchart / sequenceDiagram / classDiagram 等) */
  source: string;
  /** 図の下に小さく表示するキャプション */
  caption?: string;
};

/**
 * Mermaid 図を描画するクライアントコンポーネント。
 * - mermaid は ~200KB あるので動的 import で初回描画時にだけ読み込む
 * - ダークモードに追随 (theme: 'dark' / 'default')
 * - SSR では Mermaid ソースをそのまま <pre> でフォールバック表示
 */
export function MermaidDiagram({ source, caption }: Props) {
  const reactId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = theme === "dark";

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          themeVariables: {
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            primaryColor: isDark ? "#1f2937" : "#fff1f2",
            primaryTextColor: isDark ? "#fafafa" : "#0f172a",
            primaryBorderColor: isDark ? "#9f1239" : "#f43f5e",
            lineColor: isDark ? "#9ca3af" : "#64748b",
            secondaryColor: isDark ? "#1e293b" : "#fef3c7",
            tertiaryColor: isDark ? "#0f172a" : "#f8fafc",
          },
          securityLevel: "strict",
          flowchart: { curve: "basis" },
        });

        // 一意な ID を作る (Mermaid は id 衝突を嫌う)
        const id = `m${reactId.replace(/[^a-zA-Z0-9]/g, "")}-${Date.now()}`;
        const { svg } = await mermaid.render(id, source);
        if (!cancelled) {
          setSvg(svg);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [source, reactId, theme]);

  return (
    <figure className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-4 dark:border-white/10 dark:bg-zinc-900/60">
      {error ? (
        <pre className="overflow-x-auto rounded-lg bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
          {`Mermaid render error: ${error}\n\n${source}`}
        </pre>
      ) : svg ? (
        <div
          ref={containerRef}
          className="mermaid-figure flex justify-center overflow-x-auto"
          /* mermaid が返す SVG をそのまま挿入 (strict mode で安全) */
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-3 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {source}
        </pre>
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-[11px] text-zinc-500 dark:text-zinc-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
