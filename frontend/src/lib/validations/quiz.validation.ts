import { z } from 'zod';

export const questionSchema = z
  .object({
    text: z.string().min(1, 'Question text is required'),
    type: z.enum(['CHECKBOX', 'INPUT', 'BOOLEAN']),
    options: z.array(z.string().min(1, 'Option cannot be empty')).optional(),
    correctAnswer: z.string().min(1, 'Correct answer is required'),
  })
  .refine(
    data => {
      if (data.type === 'CHECKBOX') {
        return data.options && data.options.length >= 2;
      }
      return true;
    },
    {
      message: 'Checkbox questions must have at least 2 options',
      path: ['options'],
    }
  );

export const createQuizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required').max(200, 'Title too long'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export type CreateQuizFormData = z.infer<typeof createQuizSchema>;
