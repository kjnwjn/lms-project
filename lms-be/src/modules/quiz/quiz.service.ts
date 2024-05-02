import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { BaseService } from 'src/common/base/service/base.service';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { QuizRepository } from './repository/quiz.repository';
import { UserInfo } from '@/common/decorators/user.decorator';
import { CourseService } from '../course/course.service';
import { UserType } from '@/common/enums/userType.enum';
import { checkRoleUser } from '@/common/helpers';
import { QuizQuestionService } from '../quiz-question/quiz-question.service';

@Injectable()
export class QuizService extends BaseService<Quiz, QuizRepository> {
  constructor(
    @Inject(forwardRef(() => QuizQuestionService)) private quizQuestionService: QuizQuestionService,
    protected readonly repository: QuizRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly coursesService: CourseService,
    private readonly logger: XloggerService,
  ) {
    super(repository);
  }

  async create(createQuizDto: CreateQuizDto, user: UserInfo): Promise<Quiz> {
    try {
      this.logger.log('CREATE QUIZ: [' + JSON.stringify(createQuizDto) + ']');
      const courseExist = await this.coursesService.findOneById(createQuizDto.courseId);

      if (!courseExist)
        throw this.exceptionService.badRequestException({
          message: `Course ID ${createQuizDto.courseId} cannot be found!`,
        });

      if (checkRoleUser(user, UserType.LECTURER) && courseExist.email !== user.email)
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });

      const quizNew = await this.toQuizEntity(createQuizDto);

      if (quizNew.questionToPass > quizNew.minQuestion)
        throw this.exceptionService.badRequestException({
          message: 'Pass mark must be less than min question',
        });

      quizNew.createdBy = user.id;
      return await this.repository.save(quizNew);
    } catch (error) {
      this.logger.error('CREATE QUIZ error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async findAll() {
    try {
      return await this.repository.find();
    } catch (error) {
      this.logger.error('FIND ALL QUIZ error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async findAllsByCourseId(courseId: number, user: UserInfo) {
    try {
      this.logger.log(`Finding list quizs in course: ${courseId}`);
      const isQuizExist = await this.coursesService.findOneById(courseId);
      if (!isQuizExist)
        throw this.exceptionService.notFoundException({ message: 'Course not found' });
      if (isQuizExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const listQuiz = await this.repository.findByCourseId(courseId);
      return listQuiz;
    } catch (error) {
      this.logger.error(`Error in findListDocs: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  async studentFindAllsByCourseId(courseId: number, user: UserInfo) {
    try {
      this.logger.log(`[STUDENT API]Finding list quizs in course: ${courseId}`);
      const isQuizExist = await this.coursesService.findOneById(courseId);
      if (!isQuizExist)
        throw this.exceptionService.notFoundException({ message: 'Course not found' });
      const isStudentInCourse = await this.coursesService.checkStudentInCourse(courseId, user.id);
      if (!isStudentInCourse)
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const listQuiz = await this.repository.studentFindByCourseId(courseId);
      return listQuiz;
    } catch (error) {
      this.logger.error(`Error in findListDocs: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOneById(id);
    } catch (error) {
      this.logger.error('FIND ALL QUIZ error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async update(id: number, updateQuizDto: UpdateQuizDto, user: UserInfo) {
    try {
      const existQuiz = await this.repository.findOne({ id });
      if (!existQuiz)
        throw this.exceptionService.badRequestException({ message: 'Quiz not found' });
      const updated = await this.toQuizEntity({
        ...existQuiz,
        ...updateQuizDto,
        id: existQuiz.id,
        updatedBy: user.id,
        questionToPass: existQuiz.questionToPass,
        minQuestion: existQuiz.minQuestion,
        courseId: existQuiz.courseId,
        createdBy: existQuiz.createdBy,
      });
      return await this.repository.update({ id: updated.id }, updated);
    } catch (error) {
      this.logger.error('UPDATE QUIZ error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async publish(id: number, user: UserInfo) {
    try {
      const existQuiz = await this.repository.findOneById(id);
      if (!existQuiz)
        throw this.exceptionService.badRequestException({ message: 'Quiz not found' });

      if (existQuiz.questionList.length < existQuiz.minQuestion)
        throw this.exceptionService.badRequestException({
          message: `Number of questions must be at least ${existQuiz.minQuestion} questions`,
        });

      const newUpdated = await this.toQuizEntity(existQuiz);
      newUpdated.updatedBy = user.id;
      newUpdated.active = !existQuiz.active;

      return await this.repository.update({ id }, newUpdated);
    } catch (error) {
      this.logger.error('PUBLISH QUIZ error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({
        message: error.message || 'Bad Request',
      });
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} quiz`;
  }

  async toQuizEntity(quizDto: any): Promise<Quiz> {
    const quiz = new Quiz();
    quiz.id = quizDto?.id ? Number(quizDto?.id) : quiz.id;
    quiz.title = quizDto?.title ?? quiz.title;
    quiz.courseId = quizDto?.courseId ?? quiz.courseId;
    quiz.description = quizDto?.description ?? quiz.description;
    quiz.questionToPass = quizDto?.questionToPass ?? quiz.questionToPass;
    quiz.deadline = quizDto?.deadline ?? quiz.deadline;
    quiz.randomOrder = quizDto?.randomOrder ?? quiz.randomOrder;
    quiz.answersAtEnd = quizDto?.answersAtEnd ?? quiz.answersAtEnd;
    quiz.singleAttempt = quizDto?.singleAttempt ?? quiz.singleAttempt;
    quiz.minQuestion = quizDto?.minQuestion ?? quiz.minQuestion;
    quiz.createdBy = quizDto?.createdBy ? Number(quizDto.createdBy) : quiz.createdBy;
    quiz.updatedBy = quizDto?.updatedBy ? Number(quizDto.updatedBy) : null;
    quiz.updatedAt = quizDto?.updatedAt ?? new Date().toISOString();
    return quiz;
  }
}
