'use client';

import QuizCard from '@/components/QuizCard';
import { QuizListItem } from '@/interfaces/quiz';
import { fetchQuizzes } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';

const QuizDashboard: FC = () => {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes()
      .then(setQuizzes)
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Your Quizzes</h1>
          <button
            type="button"
            onClick={() => router.push('/create')}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
          >
            + Create Quiz
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map(quiz => (
            <QuizCard key={quiz.id} id={quiz.id} title={quiz.title} createdAt={quiz.createdAt} questionCount={quiz.questionCount} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default QuizDashboard;
