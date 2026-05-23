type Props = {
  code: string;
};

export function CodeBlock({ code }: Props) {
  return (
    <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-900 p-4 text-sm leading-relaxed text-zinc-100 dark:border-zinc-700">
      <code>{code}</code>
    </pre>
  );
}
