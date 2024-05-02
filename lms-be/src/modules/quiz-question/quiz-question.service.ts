import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { BaseService } from 'src/common/base/service/base.service';
import { QuizQuestion } from './entities/quiz-question.entity';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { QuizQuestionRepository } from './repository/quiz-question.repository';
import { QuizService } from '../quiz/quiz.service';
import { UserInfo } from '@/common/decorators/user.decorator';

@Injectable()
export class QuizQuestionService extends BaseService<QuizQuestion, QuizQuestionRepository> {
  constructor(
    @Inject(forwardRef(() => QuizService)) private quizService: QuizService,
    protected readonly repository: QuizQuestionRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly logger: XloggerService,
  ) {
    super(repository);
  }

  async create(id: number, createQuizQuestionDto: CreateQuizQuestionDto, user: UserInfo) {
    try {
      const existQuiz = await this.quizService.findOne(id);

      if (!existQuiz)
        throw this.exceptionService.badRequestException({ message: `QuizID ${id} not found` });

      const newQuizQuestion = await this.toQuizQuestionEntity(createQuizQuestionDto);
      newQuizQuestion.multipleChoice = createQuizQuestionDto.multipleChoice == 1 ? true : false;
      newQuizQuestion.createdBy = user.id;
      newQuizQuestion.quizId = id;

      await this.repository.save(newQuizQuestion);
      return 'Created successfully!';
    } catch (error) {
      this.logger.error('CREATE QUESTION error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async findAll(id: number) {
    try {
      const toQuizQuestionEntity = this.toQuizQuestionEntity;
      const existQuiz = await this.quizService.findOne(id);
      if (!existQuiz)
        throw this.exceptionService.badRequestException({ message: `QuizID ${id} not found` });
      return Promise.all(
        existQuiz.questionList.map(async function (quiz) {
          const question = await toQuizQuestionEntity(quiz);
          question.choices = quiz.choices.map((choice) => ({
            id: choice.id,
            choice: choice.choice,
          })) as any;
          return question;
        }),
      );
    } catch (error) {
      this.logger.error('FIND ALL QUESTION error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }
  async findAllByAdmin(id: number) {
    try {
      const existQuiz = await this.quizService.findOne(id);
      if (!existQuiz)
        throw this.exceptionService.badRequestException({ message: `QuizID ${id} not found` });

      return await this.repository.findQuizQuestionByQuizId(id);
    } catch (error) {
      this.logger.error('FIND ALL QUESTION error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOne({ id });
    } catch (error) {
      this.logger.error('FIND ONE QUESTION error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async update(
    quizId: number,
    questionId: number,
    updateQuizQuestionDto: UpdateQuizQuestionDto,
    user: UserInfo,
  ) {
    try {
      const existQuiz = await this.quizService.findOne(quizId);
      const existQuestion = await this.repository.findOne({ id: questionId });
      if (!existQuiz || !existQuestion)
        throw this.exceptionService.badRequestException({
          message: `Quiz ID ${quizId} or question ID ${questionId} not found`,
        });
      const newUpdated = await this.toQuizQuestionEntity({
        ...existQuestion,
        ...updateQuizQuestionDto,
        id: existQuestion.id,
        updatedBy: user.id,
      });
      return await this.repository.update({ id: questionId }, { ...newUpdated });
    } catch (error) {
      this.logger.error('UPDATE ONE QUESTION error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async remove(id: number) {
    try {
      this.logger.log(`REMOVE quiz question : ${id}`);
      const isQuizExist = await this.repository.findOne({ id });
      if (!isQuizExist)
        throw this.exceptionService.notFoundException({ message: 'Quiz question not found' });
      const isRemove = await this.repository.delete(id);
      return `Remove ${isRemove.affected} docs`;
    } catch (error) {
      this.logger.error(`Error in removeQuizQuestion: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  async toQuizQuestionEntity(quizQuestionDto: any): Promise<QuizQuestion> {
    const quiz = new QuizQuestion();
    quiz.id = quizQuestionDto?.id ? Number(quizQuestionDto?.id) : quiz.id;
    quiz.quizId = quizQuestionDto?.quizId ?? quiz.quizId;
    quiz.content = quizQuestionDto?.content ?? quiz.content;
    quiz.explanation = quizQuestionDto?.explanation ?? quiz.explanation;
    quiz.updatedBy = quizQuestionDto?.updatedBy ? Number(quizQuestionDto.updatedBy) : null;
    quiz.updatedAt = quizQuestionDto?.updatedAt ?? new Date().toISOString();
    quiz.multipleChoice = quizQuestionDto.multipleChoice;
    quiz.createdBy = quizQuestionDto?.createdBy
      ? Number(quizQuestionDto.createdBy)
      : quiz.createdBy;
    return quiz;
  }
}
