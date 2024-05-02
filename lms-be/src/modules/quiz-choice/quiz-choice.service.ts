import { Injectable } from '@nestjs/common';
import { CreateQuizChoiceDto } from './dto/create-quiz-choice.dto';
import { UpdateQuizChoiceDto } from './dto/update-quiz-choice.dto';
import { BaseService } from 'src/common/base/service/base.service';
import { QuizChoice } from './entities/quiz-choice.entity';
import { QuizChoiceRepository } from './repository/quiz-choice.repository';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { QuizQuestionService } from '../quiz-question/quiz-question.service';
import { UserInfo } from '@/common/decorators/user.decorator';

@Injectable()
export class QuizChoiceService extends BaseService<QuizChoice, QuizChoiceRepository> {
  constructor(
    protected readonly repository: QuizChoiceRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly quizQuestionsService: QuizQuestionService,
    private readonly logger: XloggerService,
  ) {
    super(repository);
  }

  async create(questionId: number, createQuizChoiceDto: CreateQuizChoiceDto, user: UserInfo) {
    try {
      const existQuestion = await this.quizQuestionsService.findOne(questionId);
      const questionChoices = await this.findAllChoices(questionId);
      if (!existQuestion)
        throw this.exceptionService.badRequestException({
          message: `Question ${questionId} not found`,
        });

      const newQuizChoice = await this.toQuizChoiceEntity(createQuizChoiceDto);
      const haveCorrects = questionChoices.filter((choice) => choice.correct);

      newQuizChoice.correct = createQuizChoiceDto.correct == 1 ? true : false;
      newQuizChoice.createdBy = user.id;
      newQuizChoice.questionId = existQuestion.id;

      if (newQuizChoice.correct && !existQuestion.multipleChoice && haveCorrects.length >= 1)
        throw this.exceptionService.badRequestException({
          message: 'This question is not a multiple choice question',
        });

      await this.repository.save(newQuizChoice);
      return 'Added successfully!';
    } catch (error) {
      this.logger.error('ADD QUESTION CHOICE error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async findAllChoices(questionId: number) {
    try {
      return await this.repository.findAllByQuestionId(questionId);
    } catch (error) {
      this.logger.error("FIND QUESTION'S CHOICES error: [" + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async update(
    questionId: number,
    choiceId: number,
    updateQuizChoiceDto: UpdateQuizChoiceDto,
    user: UserInfo,
  ) {
    try {
      const existQuestion = await this.quizQuestionsService.findOne(questionId);
      const existChoice = await this.repository.findOne({ id: choiceId, questionId: questionId });
      if (!existQuestion || !existChoice)
        throw this.exceptionService.badRequestException({
          message: `Question ${questionId} or invalid choice ${choiceId} not found`,
        });

      const newUpdate = await this.toQuizChoiceEntity(updateQuizChoiceDto);
      newUpdate.id = choiceId;
      newUpdate.updatedBy = user.id;
      newUpdate.correct = existChoice.correct;

      return await this.repository.update({ id: choiceId }, { ...newUpdate });
    } catch (error) {
      this.logger.error("UPDATE QUESTION'S CHOICES error: [" + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async verifiedAnswer(quizId: number, questionId: number, choiceId: number) {
    try {
      return await this.repository.verifiedAnswer(quizId, questionId, choiceId);
    } catch (error) {
      this.logger.error('VERIFY ANSWER error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async remove(id: number) {
    try {
      this.logger.log(`REMOVE quiz choice : ${id}`);
      const isQuizExist = await this.repository.findOne({ id });
      if (!isQuizExist)
        throw this.exceptionService.notFoundException({ message: 'Quiz choice not found' });
      const isRemove = await this.repository.delete(id);
      return `Remove ${isRemove.affected} docs`;
    } catch (error) {
      this.logger.error(`Error in removeQuizChoice: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  async toQuizChoiceEntity(quizChoiceDto: any): Promise<QuizChoice> {
    const quizChoice = new QuizChoice();
    quizChoice.id = quizChoiceDto?.id ? Number(quizChoiceDto?.id) : quizChoice.id;
    quizChoice.choice = quizChoiceDto?.choice ?? quizChoice.choice;
    quizChoice.correct = quizChoiceDto?.correct ?? quizChoice.correct;
    quizChoice.updatedBy = quizChoiceDto?.updatedBy ? Number(quizChoiceDto.updatedBy) : null;
    quizChoice.updatedAt = quizChoiceDto?.updatedAt ?? new Date().toISOString();
    quizChoice.createdBy = quizChoiceDto?.createdBy
      ? Number(quizChoiceDto.createdBy)
      : quizChoice.createdBy;
    return quizChoice;
  }
}
