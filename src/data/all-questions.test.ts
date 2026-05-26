import { describe, it, expect } from "vitest";
import { allQuestions, questionsByTrack } from "./all-questions";
import { categories, findCategory } from "./categories";
import { tracks } from "./tracks";

describe("allQuestions data integrity", () => {
  it("has no duplicate question IDs", () => {
    const ids = new Map<string, number>();
    for (const q of allQuestions) {
      ids.set(q.id, (ids.get(q.id) ?? 0) + 1);
    }
    const dupes = [...ids.entries()].filter(([, n]) => n > 1);
    expect(dupes, `duplicate IDs: ${dupes.map(([id]) => id).join(", ")}`).toEqual([]);
  });

  it("every question.categoryId resolves to a real category", () => {
    const unknown: string[] = [];
    for (const q of allQuestions) {
      if (!findCategory(q.categoryId)) unknown.push(`${q.id} → ${q.categoryId}`);
    }
    expect(unknown, `unknown categories: ${unknown.join(", ")}`).toEqual([]);
  });

  it("every category.trackId resolves to a real track", () => {
    const trackIds = new Set(tracks.map((t) => t.id));
    const orphans = categories.filter((c) => !trackIds.has(c.trackId));
    expect(orphans.map((c) => c.id)).toEqual([]);
  });

  it("questionsByTrack returns only questions belonging to the track's categories", () => {
    for (const t of tracks) {
      const qs = questionsByTrack(t.id);
      const allCategoryIds = new Set(
        categories.filter((c) => c.trackId === t.id).map((c) => c.id),
      );
      const offenders = qs.filter((q) => !allCategoryIds.has(q.categoryId));
      expect(
        offenders.map((q) => q.id),
        `track ${t.id} returned questions from foreign categories: ${offenders.map((q) => q.id).join(", ")}`,
      ).toEqual([]);
    }
  });

  it("ChoiceQuestion.answerIndex points to a valid choice", () => {
    const offenders: string[] = [];
    for (const q of allQuestions) {
      if (q.type !== "choice") continue;
      if (q.answerIndex < 0 || q.answerIndex >= q.choices.length) {
        offenders.push(`${q.id} answerIndex=${q.answerIndex} choices.length=${q.choices.length}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
