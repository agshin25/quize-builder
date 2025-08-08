'use client';

import { QuizListItem } from '@/interfaces/quiz';
import { deleteQuiz } from '@/lib/api';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

const QuizCard: FC<QuizListItem> = ({ id, title, questionCount }) => {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteQuiz(id);
      window.location.reload();
    } catch {
      alert('Failed to delete quiz. Please try again.');
    }
  };

  const handleView: VoidFunction = () => {
    router.push(`/quizzes/${id}`);
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm mb-4">{questionCount} Questions • Created just now</p>
      <div className="flex justify-between gap-4">
        <button onClick={handleView} type="button" className="text-blue-600 font-medium hover:underline">
          View
        </button>
        <button onClick={handleDelete} type="button" className="text-red-600 font-medium hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
