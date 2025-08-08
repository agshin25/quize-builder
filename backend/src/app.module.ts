import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
    imports: [PrismaModule, QuizModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
