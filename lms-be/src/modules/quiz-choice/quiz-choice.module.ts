import { Module } from '@nestjs/common';
import { QuizChoiceService } from './quiz-choice.service';
import { QuizChoiceController } from './quiz-choice.controller';
import { QuizChoiceRepository } from './repository/quiz-choice.repository';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { QuizQuestionModule } from '../quiz-question/quiz-question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizChoiceRepository]),
    XLoggerModule,
    ExceptionsModule,
    QuizQuestionModule,
  ],
  controllers: [QuizChoiceController],
  providers: [QuizChoiceService, QuizChoiceRepository],
  exports: [TypeOrmModule, QuizChoiceService],
})
export class QuizChoiceModule {
  /**Empty */
}
