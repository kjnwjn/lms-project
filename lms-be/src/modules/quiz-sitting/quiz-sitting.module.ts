import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizSittingController } from './quiz-sitting.controller';
import { QuizSittingService } from './quiz-sitting.service';
import { QuizSittingRepository } from './repository/quiz-sitting.repository';
import { XLoggerModule } from '@/common/Xlogger/Xlogger.module';
import { ExceptionsModule } from '@/common/exceptions/exceptions.module';
import { CourseModule } from '../course/course.module';
import { QuizModule } from '../quiz/quiz.module';
import { QuizChoiceModule } from '../quiz-choice/quiz-choice.module';
import { QuizQuestionModule } from '../quiz-question/quiz-question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizSittingRepository]),
    XLoggerModule,
    ExceptionsModule,
    QuizChoiceModule,
    QuizQuestionModule,
    CourseModule,
    QuizModule,
  ],
  controllers: [QuizSittingController],
  providers: [QuizSittingService, QuizSittingRepository],
})
export class QuizSittingModule {
  /**Empty */
}
