import { Module, forwardRef } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { QuizQuestionRepository } from './repository/quiz-question.repository';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizQuestionRepository]),
    XLoggerModule,
    ExceptionsModule,
    forwardRef(() => QuizModule),
  ],
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService, QuizQuestionRepository],
  exports: [TypeOrmModule, QuizQuestionService],
})
export class QuizQuestionModule {
  /**Empty */
}
