import { notFound } from "next/navigation";
import { findCategory, categories } from "@/data/categories";
import { questionsByCategory } from "@/data/questions";
import { QuizRunner } from "@/components/QuizRunner";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

type Props = {
  params: Promise<{ category: string }>;
};

export default async function QuizPage({ params }: Props) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) notFound();

  const qs = questionsByCategory(cat.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <QuizRunner questions={qs} categoryName={cat.name} />
    </div>
  );
}
