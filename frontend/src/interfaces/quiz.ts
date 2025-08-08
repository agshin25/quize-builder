export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface QuizListItem {
  id: number;
  title: string;
  questionCount: number;
  createdAt: string;
}

export interface Question {
  id?: number;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
}

export interface QuizDetail {
  id: number;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuizRequest {
  title: string;
  questions: Omit<Question, 'id'>[];
}
