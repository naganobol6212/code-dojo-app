import { describe, it, expect } from "vitest";
import { recallCandidates, summarize, RECALL_THRESHOLDS } from "./recall";
import type { Progress, Question, QuestionAttempt } from "./types";

const MS_DAY = 86400000;
const NOW = new Date("2026-05-26T12:00:00Z");

function makeQuestion(id: string): Question {
  return {
    id,
    categoryId: "ruby-basics",
    difficulty: "beginner",
    question: `Q ${id}`,
    hints: [],
    explanation: { summary: "—", reason: "—" },
    type: "choice",
    choices: ["A", "B"],
    answerIndex: 0,
  };
}

function makeAttempt(partial: Partial<QuestionAttempt> & { questionId: string }): QuestionAttempt {
  return {
    solved: false,
    attempts: 1,
    hintsUsed: 0,
    lastAnsweredAt: NOW.toISOString(),
    mark: null,
    ...partial,
  };
}

function makeProgress(
  attempts: Record<string, QuestionAttempt>,
): Progress {
  return {
    attempts,
    totalSolved: Object.values(attempts).filter((a) => a.solved).length,
    totalAttempts: Object.values(attempts).reduce((s, a) => s + a.attempts, 0),
    bestStreak: 0,
  };
}

function daysAgo(n: number): string {
  return new Date(NOW.getTime() - n * MS_DAY).toISOString();
}

describe("recallCandidates", () => {
  it("returns empty when no attempts exist", () => {
    const out = recallCandidates(makeProgress({}), [makeQuestion("q1")], NOW);
    expect(out).toEqual([]);
  });

  it("excludes mastered questions even if they qualify by age", () => {
    const out = recallCandidates(
      makeProgress({
        q1: makeAttempt({
          questionId: "q1",
          solved: true,
          mark: "mastered",
          lastAnsweredAt: daysAgo(40),
        }),
      }),
      [makeQuestion("q1")],
      NOW,
    );
    expect(out).toEqual([]);
  });

  it("includes review-marked questions regardless of age", () => {
    const out = recallCandidates(
      makeProgress({
        q1: makeAttempt({
          questionId: "q1",
          mark: "review",
          lastAnsweredAt: daysAgo(0),
        }),
      }),
      [makeQuestion("q1")],
      NOW,
    );
    expect(out).toHaveLength(1);
    expect(out[0].reason).toBe("marked-review");
  });

  it("ignores solved questions answered within 7 days", () => {
    const out = recallCandidates(
      makeProgress({
        q1: makeAttempt({
          questionId: "q1",
          solved: true,
          lastAnsweredAt: daysAgo(3),
        }),
      }),
      [makeQuestion("q1")],
      NOW,
    );
    expect(out).toEqual([]);
  });

  it("flags 7-day-old solved questions as solved-7d", () => {
    const out = recallCandidates(
      makeProgress({
        q1: makeAttempt({
          questionId: "q1",
          solved: true,
          lastAnsweredAt: daysAgo(RECALL_THRESHOLDS.weekly),
        }),
      }),
      [makeQuestion("q1")],
      NOW,
    );
    expect(out).toHaveLength(1);
    expect(out[0].reason).toBe("solved-7d");
  });

  it("flags 30-day-old solved questions as solved-30d (higher priority than 7d)", () => {
    const out = recallCandidates(
      makeProgress({
        q1: makeAttempt({
          questionId: "q1",
          solved: true,
          lastAnsweredAt: daysAgo(RECALL_THRESHOLDS.monthly),
        }),
        q2: makeAttempt({
          questionId: "q2",
          solved: true,
          lastAnsweredAt: daysAgo(8),
        }),
      }),
      [makeQuestion("q1"), makeQuestion("q2")],
      NOW,
    );
    expect(out).toHaveLength(2);
    expect(out[0].question.id).toBe("q1");
    expect(out[0].reason).toBe("solved-30d");
    expect(out[1].reason).toBe("solved-7d");
  });

  it("excludes unsolved questions that are not review-marked", () => {
    const out = recallCandidates(
      makeProgress({
        q1: makeAttempt({
          questionId: "q1",
          solved: false,
          lastAnsweredAt: daysAgo(40),
        }),
      }),
      [makeQuestion("q1")],
      NOW,
    );
    expect(out).toEqual([]);
  });
});

describe("summarize", () => {
  it("counts each reason bucket", () => {
    const out = recallCandidates(
      makeProgress({
        q1: makeAttempt({
          questionId: "q1",
          solved: true,
          mark: "review",
          lastAnsweredAt: daysAgo(1),
        }),
        q2: makeAttempt({
          questionId: "q2",
          solved: true,
          lastAnsweredAt: daysAgo(40),
        }),
        q3: makeAttempt({
          questionId: "q3",
          solved: true,
          lastAnsweredAt: daysAgo(10),
        }),
      }),
      [makeQuestion("q1"), makeQuestion("q2"), makeQuestion("q3")],
      NOW,
    );
    const s = summarize(out);
    expect(s.total).toBe(3);
    expect(s.markedReview).toBe(1);
    expect(s.over30d).toBe(1);
    expect(s.over7d).toBe(1);
  });

  it("returns zeroes when empty", () => {
    expect(summarize([])).toEqual({
      total: 0,
      markedReview: 0,
      over30d: 0,
      over7d: 0,
    });
  });
});
