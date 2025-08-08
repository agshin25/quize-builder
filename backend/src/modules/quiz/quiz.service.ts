import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto, QuestionDto } from './dto/create-quiz.dto';
import { QuizDetailResponseDto, QuizListItemDto } from './dto/response.dto';
import { Question, Quiz } from '@prisma/client';

@Injectable()
export class QuizService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<QuizListItemDto[]> {
        const quizzes = await this.prisma.quiz.findMany({
            include: { questions: true },
            orderBy: { createdAt: 'desc' },
        });

        const result = quizzes.map((q: Quiz & { questions: Question[] }) => ({
            id: q.id,
            title: q.title,
            questionCount: q.questions.length,
            createdAt: q.createdAt,
        }));

        return result;
    }

    async getOneQuiz(id: number): Promise<QuizDetailResponseDto> {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: true,
            },
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        const result: QuizDetailResponseDto = {
            id: quiz.id,
            title: quiz.title,
            questions: quiz.questions.map((q: QuestionDto) => ({
                ...q,
                options: q.options ? JSON.parse(q.options) : undefined,
            })),
            createdAt: quiz.createdAt,
            updatedAt: quiz.updatedAt,
        };

        return result;
    }

    async createQuiz(params: CreateQuizDto): Promise<QuizDetailResponseDto> {
        const { title, questions }: { title: string; questions: QuestionDto[] } = params;

        if (!questions || questions.length === 0) {
            throw new BadRequestException('Quiz must have at least one question');
        }

        try {
            const quiz = await this.prisma.quiz.create({
                data: {
                    title: title,
                    questions: {
                        create: questions.map((q: QuestionDto) => ({
                            ...q,
                            options: q.options ? JSON.stringify(q.options) : null,
                        })),
                    },
                },
                include: { questions: true },
            });

            const result: QuizDetailResponseDto = {
                id: quiz.id,
                title: quiz.title,
                questions: quiz.questions.map((q: QuestionDto) => ({
                    ...q,
                    options: q.options ? JSON.parse(q.options) : undefined,
                })),
                createdAt: quiz.createdAt,
                updatedAt: quiz.updatedAt,
            };

            return result;
        } catch {
            throw new InternalServerErrorException('Failed to create quiz');
        }
    }

    async deleteQuiz(id: number): Promise<{ message: string }> {
        const existing = await this.prisma.quiz.findUnique({ where: { id } });

        if (!existing) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        try {
            await this.prisma.quiz.delete({ where: { id } });
            return { message: `Quiz ${id} deleted successfully` };
        } catch {
            throw new InternalServerErrorException('Could not delete quiz');
        }
    }
}
