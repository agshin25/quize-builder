'use client';

import { Control, useWatch, UseFormRegister, FieldErrors, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { Trash2, Plus } from 'lucide-react';
import type { CreateQuizFormData } from '@/lib/validations/quiz.validation';

interface QuestionFormProps {
  control: Control<CreateQuizFormData>;
  register: UseFormRegister<CreateQuizFormData>;
  errors: FieldErrors<CreateQuizFormData>;
  questionIndex: number;
  onRemove: () => void;
  canRemove: boolean;
  setValue: UseFormSetValue<CreateQuizFormData>;
  getValues: UseFormGetValues<CreateQuizFormData>;
}

export default function QuestionForm({ control, register, errors, questionIndex, onRemove, canRemove, setValue, getValues }: QuestionFormProps) {
  const watchedType = useWatch({
    control,
    name: `questions.${questionIndex}.type`,
    defaultValue: 'INPUT',
  });

  const watchedOptions = useWatch({
    control,
    name: `questions.${questionIndex}.options`,
    defaultValue: [],
  });

  const addOption = () => {
    const currentOptions = getValues(`questions.${questionIndex}.options`) || [];
    setValue(`questions.${questionIndex}.options`, [...currentOptions, '']);
  };

  const removeOption = (optionIndex: number) => {
    const currentOptions = getValues(`questions.${questionIndex}.options`) || [];
    const newOptions = currentOptions.filter((_: string, index: number) => index !== optionIndex);
    setValue(`questions.${questionIndex}.options`, newOptions);
  };

  const questionError = errors?.questions?.[questionIndex];

  return (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Question {questionIndex + 1}</h3>
        {canRemove && (
          <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 p-1 rounded">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
        <input
          {...register(`questions.${questionIndex}.text`)}
          className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your question..."
        />
        {questionError?.text && <p className="text-red-500 text-sm mt-1">{questionError.text.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
        <select
          {...register(`questions.${questionIndex}.type`)}
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="INPUT">Text Input</option>
          <option value="BOOLEAN">True/False</option>
          <option value="CHECKBOX">Multiple Choice</option>
        </select>
        {questionError?.type && <p className="text-red-500 text-sm mt-1">{questionError.type.message}</p>}
      </div>

      {watchedType === 'CHECKBOX' && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            <button type="button" onClick={addOption} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
              <Plus size={16} />
              Add Option
            </button>
          </div>

          {(watchedOptions || []).map((option: string, optionIndex: number) => (
            <div key={optionIndex} className="flex gap-2 mb-2">
              <input
                {...register(`questions.${questionIndex}.options.${optionIndex}` as const)}
                className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Option ${optionIndex + 1}`}
              />
              {(watchedOptions || []).length > 2 && (
                <button type="button" onClick={() => removeOption(optionIndex)} className="text-red-500 hover:text-red-700 p-2">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          {questionError?.options && <p className="text-red-500 text-sm mt-1">{questionError.options.message}</p>}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
        {watchedType === 'BOOLEAN' ? (
          <select
            {...register(`questions.${questionIndex}.correctAnswer`)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select correct answer...</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        ) : (
          <input
            {...register(`questions.${questionIndex}.correctAnswer`)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={watchedType === 'CHECKBOX' ? 'Enter the correct option exactly as written above' : 'Enter the correct answer'}
          />
        )}
        {questionError?.correctAnswer && <p className="text-red-500 text-sm mt-1">{questionError.correctAnswer.message}</p>}
      </div>
    </div>
  );
}
