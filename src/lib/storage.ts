import type { Progress, QuestionAttempt } from "./types";

const STORAGE_KEY = "rrq_progress_v2";

const emptyProgress = (): Progress => ({
  attempts: {},
  totalSolved: 0,
  totalAttempts: 0,
  bestStreak: 0,
});

export const loadProgress = (): Progress => {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      attempts: parsed.attempts ?? {},
      totalSolved: parsed.totalSolved ?? 0,
      totalAttempts: parsed.totalAttempts ?? 0,
      bestStreak: parsed.bestStreak ?? 0,
    };
  } catch {
    return emptyProgress();
  }
};

export const saveProgress = (progress: Progress) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("rrq:progress-updated"));
};

export const recordAttempt = (
  questionId: string,
  solved: boolean,
  hintsUsed: number,
  currentStreak: number,
): Progress => {
  const progress = loadProgress();
  const prev: QuestionAttempt = progress.attempts[questionId] ?? {
    questionId,
    solved: false,
    attempts: 0,
    hintsUsed: 0,
    lastAnsweredAt: new Date().toISOString(),
  };

  const wasAlreadySolved = prev.solved;
  const updated: QuestionAttempt = {
    questionId,
    solved: prev.solved || solved,
    attempts: prev.attempts + 1,
    hintsUsed: Math.max(prev.hintsUsed, hintsUsed),
    lastAnsweredAt: new Date().toISOString(),
  };

  const newProgress: Progress = {
    attempts: { ...progress.attempts, [questionId]: updated },
    totalAttempts: progress.totalAttempts + 1,
    totalSolved:
      progress.totalSolved + (solved && !wasAlreadySolved ? 1 : 0),
    bestStreak: Math.max(progress.bestStreak, currentStreak),
  };

  saveProgress(newProgress);
  return newProgress;
};

export const resetProgress = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("rrq:progress-updated"));
};
