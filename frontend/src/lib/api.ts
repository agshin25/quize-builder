import type { CreateQuizRequest, QuizDetail, QuizListItem } from '@/interfaces/quiz';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function fetchQuizzes(): Promise<QuizListItem[]> {
  const res = await fetch(`${BASE_URL}/quizzes`);
  if (!res.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  return res.json();
}

export async function fetchQuizById(id: number): Promise<QuizDetail> {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch quiz with id ${id}`);
  }
  return res.json();
}

export async function createQuiz(data: CreateQuizRequest): Promise<QuizDetail> {
  const res = await fetch(`${BASE_URL}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to create quiz');
  }
  return res.json();
}

export async function deleteQuiz(id: number): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`Failed to delete quiz with id ${id}`);
  }
  return res.json();
}
