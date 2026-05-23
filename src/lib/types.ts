export type Difficulty = "beginner" | "intermediate" | "advanced";

export type CategoryId =
  | "ruby-basics"
  | "collections"
  | "rails-convention"
  | "active-record"
  | "routing-controller";

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
  emoji: string;
};

export type ChoiceQuestion = {
  id: string;
  categoryId: CategoryId;
  difficulty: Difficulty;
  type: "choice";
  question: string;
  code?: string;
  choices: string[];
  answerIndex: number;
  hints: string[];
  explanation: string;
};

export type TextQuestion = {
  id: string;
  categoryId: CategoryId;
  difficulty: Difficulty;
  type: "text";
  question: string;
  code?: string;
  answers: string[];
  hints: string[];
  explanation: string;
};

export type Question = ChoiceQuestion | TextQuestion;

export type QuestionAttempt = {
  questionId: string;
  solved: boolean;
  attempts: number;
  hintsUsed: number;
  lastAnsweredAt: string;
};

export type Progress = {
  attempts: Record<string, QuestionAttempt>;
  totalSolved: number;
  totalAttempts: number;
};
