import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizDetailResponseDto, QuizListItemDto } from './dto/response.dto';

@Controller('quizzes')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Get()
    getAll(): Promise<QuizListItemDto[]> {
        return this.quizService.getAll();
    }

    @Get(':id')
    getOneQuiz(@Param('id') id: number): Promise<QuizDetailResponseDto> {
        return this.quizService.getOneQuiz(id);
    }

    @Post()
    createQuiz(@Body() body: CreateQuizDto): Promise<QuizDetailResponseDto> {
        return this.quizService.createQuiz(body);
    }

    @Delete(':id')
    deleteQuiz(@Param('id') id: number): Promise<{ message: string }> {
        return this.quizService.deleteQuiz(id);
    }
}
