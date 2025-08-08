'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import { QuizDetail } from '@/interfaces/quiz';
import { fetchQuizById } from '@/lib/api';

export default function QuizDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      if (!params.id) return;

      try {
        setIsLoading(true);
        setError(null);
        const quizData = await fetchQuizById(Number(params.id));
        setQuiz(quizData);
      } catch {
        setError('Failed to load quiz');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-blue-700 text-lg">Loading quiz...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !quiz) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-4">{error || 'Quiz not found'}</p>
            <button
              type="button"
              onClick={() => router.push('/quizzes')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button type="button" onClick={() => router.push('/quizzes')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft size={20} />
            Back to Quizzes
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">{quiz.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span>{quiz.questions.length} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Created: {formatDate(quiz.createdAt)}</span>
            </div>
            {quiz.updatedAt !== quiz.createdAt && (
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Updated: {formatDate(quiz.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={question.id || index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">{index + 1}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{question.text}</h3>

                  <div className="mb-4">
                    <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      {question.type === 'INPUT' && 'Text Input'}
                      {question.type === 'BOOLEAN' && 'True/False'}
                      {question.type === 'CHECKBOX' && 'Multiple Choice'}
                    </span>
                  </div>

                  {question.type === 'CHECKBOX' && question.options && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Options:</p>
                      <ul className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <li key={optionIndex} className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                            <span className="text-gray-700">{option}</span>
                            {option === question.correctAnswer && <span className="ml-2 text-green-600 text-sm font-medium">✓ Correct</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {question.type === 'BOOLEAN' && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Options:</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                          <span className="text-gray-700">True</span>
                          {question.correctAnswer === 'true' && <span className="ml-2 text-green-600 text-sm font-medium">✓ Correct</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                          <span className="text-gray-700">False</span>
                          {question.correctAnswer === 'false' && <span className="ml-2 text-green-600 text-sm font-medium">✓ Correct</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {question.type === 'INPUT' && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Expected Answer:</p>
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                        <span className="text-gray-700">{question.correctAnswer}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => router.push('/quizzes')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
          >
            Back to Quiz List
          </button>
        </div>
      </div>
    </main>
  );
}
