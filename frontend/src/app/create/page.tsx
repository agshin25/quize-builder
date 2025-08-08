'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, ArrowLeft } from 'lucide-react';
import { createQuizSchema, type CreateQuizFormData } from '@/lib/validations/quiz.validation';
import { createQuiz } from '@/lib/api';
import QuestionForm from '@/components/QuestionForm';

export default function CreateQuizPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateQuizFormData>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: '',
      questions: [
        {
          text: '',
          type: 'INPUT',
          options: [],
          correctAnswer: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = () => {
    append({
      text: '',
      type: 'INPUT',
      options: [],
      correctAnswer: '',
    });
  };

  const onSubmit = async (data: CreateQuizFormData) => {
    setIsSubmitting(true);
    try {
      const apiData = {
        title: data.title,
        questions: data.questions.map(q => ({
          text: q.text,
          type: q.type,
          options: q.type === 'CHECKBOX' ? q.options : undefined,
          correctAnswer: q.correctAnswer,
        })),
      };

      await createQuiz(apiData);
      router.push('/quizzes');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => router.push('/quizzes')} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <ArrowLeft size={20} />
              Back to Quizzes
            </button>
            <h1 className="text-3xl font-bold text-blue-700">Create New Quiz</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Title *</label>
              <input
                {...register('title')}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter quiz title..."
              />
              {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Questions</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition duration-300"
              >
                <Plus size={18} />
                Add Question
              </button>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <QuestionForm
                  key={field.id}
                  control={control}
                  register={register}
                  errors={errors}
                  questionIndex={index}
                  onRemove={() => remove(index)}
                  canRemove={fields.length > 1}
                  setValue={setValue}
                  getValues={getValues}
                />
              ))}
            </div>

            {errors.questions && (
              <p className="text-red-500 text-sm mt-4">
                {typeof errors.questions.message === 'string' ? errors.questions.message : 'Please check your questions for errors'}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/quizzes')}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition duration-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
