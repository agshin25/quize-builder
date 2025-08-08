import type { QuestionDto } from './create-quiz.dto';

export class QuizListItemDto {
    id: number;
    title: string;
    questionCount: number;
    createdAt: Date;
}

export class QuizDetailResponseDto {
    id: number;
    title: string;
    questions: QuestionDto[];
    createdAt: Date;
    updatedAt: Date;
}
