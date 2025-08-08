import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class QuestionDto {
    @IsString()
    text: string;

    @ApiProperty({
        enum: QuestionType,
        default: QuestionType.CHECKBOX,
        description: 'Type of question',
    })
    @IsEnum(QuestionType)
    type: QuestionType;

    @IsArray()
    @IsOptional()
    options?: string | null;

    @IsString()
    correctAnswer: string;
}

export class CreateQuizDto {
    @IsString()
    title: string;

    @IsArray()
    @Type(() => QuestionDto)
    questions: QuestionDto[];
}
