import type { RoadmapPhase, RoadmapStep } from "@/data/roadmap";
import type { Progress } from "@/lib/types";

export type StepStatus = "not-started" | "in-progress" | "completed" | "no-quiz";

export type StepStats = {
  total: number;
  done: number;
  /** 見直しマーク (mark === "review") が付いている問題数 */
  weak: number;
  percent: number;
  status: StepStatus;
};

export type PhaseStats = {
  total: number;
  done: number;
  weak: number;
  percent: number;
  completedSteps: number;
  totalSteps: number;
};

export type ProgressIndex = {
  solvedIds: Set<string>;
  /** 「🔁 見直し」マークが付いている問題 ID */
  weakIds: Set<string>;
};

export function indexProgress(progress: Progress): ProgressIndex {
  const solvedIds = new Set<string>();
  const weakIds = new Set<string>();
  for (const [qid, a] of Object.entries(progress.attempts)) {
    if (a.solved) solvedIds.add(qid);
    if (a.mark === "review") weakIds.add(qid);
  }
  return { solvedIds, weakIds };
}

export function computeStepStats(
  step: RoadmapStep,
  index: ProgressIndex,
): StepStats {
  let total = 0;
  let done = 0;
  let weak = 0;
  for (const item of step.items) {
    if (item.requiredQuestionIds?.length) {
      for (const id of item.requiredQuestionIds) {
        total++;
        if (index.solvedIds.has(id)) done++;
        if (index.weakIds.has(id)) weak++;
      }
    }
  }
  if (total === 0) {
    return { total: 0, done: 0, weak: 0, percent: 0, status: "no-quiz" };
  }
  const percent = Math.round((done / total) * 100);
  const status: StepStatus =
    done === total ? "completed" : done > 0 ? "in-progress" : "not-started";
  return { total, done, weak, percent, status };
}

export function computePhaseStats(
  phase: RoadmapPhase,
  index: ProgressIndex,
): PhaseStats {
  let total = 0;
  let done = 0;
  let weak = 0;
  let completedSteps = 0;
  for (const step of phase.steps) {
    const s = computeStepStats(step, index);
    total += s.total;
    done += s.done;
    weak += s.weak;
    if (s.status === "completed" || s.status === "no-quiz") completedSteps++;
  }
  return {
    total,
    done,
    weak,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    completedSteps,
    totalSteps: phase.steps.length,
  };
}

export type NextStepHit = {
  phase: RoadmapPhase;
  step: RoadmapStep;
  stats: StepStats;
};

/**
 * 次にやるべきステップを 1 つ選ぶ。
 * 優先順位: 1) 進行中で最も進んだもの 2) 最初の未着手 3) なければ null。
 * クイズが無いステップは『次にやる』候補から外す (やりようがないので)。
 */
export function findNextStep(
  phases: RoadmapPhase[],
  index: ProgressIndex,
): NextStepHit | null {
  let inProgressBest: NextStepHit | null = null;
  let firstNotStarted: NextStepHit | null = null;

  for (const phase of phases) {
    for (const step of phase.steps) {
      const stats = computeStepStats(step, index);
      if (stats.status === "in-progress") {
        if (
          !inProgressBest ||
          stats.percent > inProgressBest.stats.percent
        ) {
          inProgressBest = { phase, step, stats };
        }
      } else if (stats.status === "not-started" && !firstNotStarted) {
        firstNotStarted = { phase, step, stats };
      }
    }
  }
  return inProgressBest ?? firstNotStarted;
}

export type RoadmapFilter = "all" | "incomplete" | "completed" | "weak";

export function stepMatchesFilter(
  stats: StepStats,
  filter: RoadmapFilter,
): boolean {
  switch (filter) {
    case "all":
      return true;
    case "incomplete":
      return stats.status === "not-started" || stats.status === "in-progress";
    case "completed":
      return stats.status === "completed";
    case "weak":
      return stats.weak > 0;
  }
}

/** フィルタごとの該当ステップ数 (チップに件数表示するため) */
export function countByFilter(
  phases: RoadmapPhase[],
  index: ProgressIndex,
): Record<RoadmapFilter, number> {
  const counts: Record<RoadmapFilter, number> = {
    all: 0,
    incomplete: 0,
    completed: 0,
    weak: 0,
  };
  for (const phase of phases) {
    for (const step of phase.steps) {
      const s = computeStepStats(step, index);
      counts.all++;
      if (stepMatchesFilter(s, "incomplete")) counts.incomplete++;
      if (stepMatchesFilter(s, "completed")) counts.completed++;
      if (stepMatchesFilter(s, "weak")) counts.weak++;
    }
  }
  return counts;
}
