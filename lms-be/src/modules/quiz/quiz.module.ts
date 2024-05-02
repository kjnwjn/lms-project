import { Module, forwardRef } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizRepository } from './repository/quiz.repository';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { CourseModule } from '../course/course.module';
import { QuizQuestionModule } from '../quiz-question/quiz-question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizRepository]),
    XLoggerModule,
    ExceptionsModule,
    CourseModule,
    forwardRef(() => QuizQuestionModule),
  ],
  controllers: [QuizController],
  providers: [QuizService, QuizRepository],
  exports: [QuizService],
})
export class QuizModule {
  /**Empty */
}
