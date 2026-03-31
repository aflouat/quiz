export interface Subject {
  id: string;
  name: string;
  icon?: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  durationSec?: number;
  questionCount: number;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
}

export interface AnswerSummary {
  questionId: string;
  text: string;
  choices: string[];
  selectedIndex: number | null;
  correctIndex: number;
}
