import { Injectable } from '@nestjs/common';
import { BaseService } from '@/common/base/service/base.service';
import { QuizSitting } from './entities/quiz-sitting.entity';
import { QuizSittingRepository } from './repository/quiz-sitting.repository';
import { ExceptionsService } from '@/common/exceptions/exceptions.service';
import { XloggerService } from '@/common/Xlogger/Xlogger.service';
import { UserInfo } from '@/common/decorators/user.decorator';
import { CourseService } from '../course/course.service';
import { QuizService } from '../quiz/quiz.service';
import { SubmitQuizSittingDto } from './dto/submit-quiz-sitting.dto';
import { TimingQuizSittingDto } from './dto/timing-quiz-sitting.dto';
import { QuizChoiceService } from '../quiz-choice/quiz-choice.service';
import { QuizQuestionService } from '../quiz-question/quiz-question.service';

@Injectable()
export class QuizSittingService extends BaseService<QuizSitting, QuizSittingRepository> {
  constructor(
    protected readonly repository: QuizSittingRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly quizChoiceService: QuizChoiceService,
    private readonly quizQuestionService: QuizQuestionService,
    private readonly courseService: CourseService,
    private readonly quizService: QuizService,
    private readonly logger: XloggerService,
  ) {
    super(repository);
  }

  async findAllByStudent(quizId: number, quizSittingId: number, user: UserInfo) {
    try {
      const existQuiz = await this.quizService.findOne(quizId);
      if (!existQuiz)
        throw this.exceptionService.badRequestException({ message: `QuizID ${quizId} not found` });
      const isQuizSittingExist = await this.repository.findAllByStudent(
        quizId,
        quizSittingId,
        Number(user.id),
      );
      if (!isQuizSittingExist)
        throw this.exceptionService.badRequestException({
          message: `QuizSittingID ${quizSittingId} not found`,
        });
      const listQuestion = await this.quizQuestionService.findAllByAdmin(quizId);
      const data = { ...isQuizSittingExist, quizId: existQuiz.id, questions: listQuestion };
      return data;
    } catch (error) {
      this.logger.error('FIND ALL QUESTION error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async findAllByQuizId(quizId: number, user: UserInfo) {
    try {
      const existQuiz = await this.quizService.findOne(quizId);
      if (!existQuiz)
        throw this.exceptionService.badRequestException({ message: `QuizID ${quizId} not found` });
      const isQuizSittingExist = await this.repository.findAllByQuizId(quizId, Number(user.id));
      if (!isQuizSittingExist)
        throw this.exceptionService.badRequestException({
          message: `QuizSittingID not found`,
        });
      return isQuizSittingExist;
    } catch (error) {
      this.logger.error(
        'FIND ALL QUIZ SITTING BY QUIZ ID error: [' + JSON.stringify(error.message) + ']',
      );
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async init(body: TimingQuizSittingDto, user: UserInfo) {
    try {
      const verified = await this.verifyStudent(body.courseId, body.quizId, user);
      const isSubmitted = await this.repository.verifyQuiz(body.courseId, body.quizId, user.id);
      if (verified.quiz.singleAttempt && isSubmitted)
        throw this.exceptionService.badRequestException({
          message: 'This quiz only allow single attempt',
        });
      const newSitting = await this.toQuizSittingEntity({
        courseId: body.courseId,
        quizId: body.quizId,
        userId: user.id,
      });
      newSitting.startTime = new Date().toISOString();
      newSitting.createdBy = user.id;
      newSitting.updatedBy = user.id;
      return await this.repository.save(newSitting);
    } catch (error) {
      this.logger.error('INIT SITTING error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async finish(sittingId: number, body: TimingQuizSittingDto, user: UserInfo) {
    try {
      await this.verifyStudent(body.courseId, body.quizId, user);
      const existedSitting = await this.repository.verifyOwner(sittingId, user.id);
      if (!existedSitting)
        throw this.exceptionService.badRequestException({ message: 'Invalid sitting ID' });
      if (existedSitting.isComplete)
        throw this.exceptionService.badRequestException({
          message: 'This quiz has already completed',
        });
      const updatedSitting = await this.toQuizSittingEntity(existedSitting);
      updatedSitting.isComplete = true;
      updatedSitting.quizId = body.quizId;
      updatedSitting.courseId = body.courseId;
      updatedSitting.userId = user.id;
      updatedSitting.updatedBy = user.id;
      updatedSitting.endTime = new Date().toISOString();
      return await this.repository.update({ id: sittingId }, { ...updatedSitting });
    } catch (error) {
      this.logger.error('FINISH SITTING error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async submit(sittingId: number, body: SubmitQuizSittingDto, user: UserInfo) {
    try {
      await this.verifyStudent(body.courseId, body.quizId, user);
      const existedSitting = await this.repository.verifyOwner(sittingId, user.id);
      const existedQuestion = await this.quizQuestionService.findOne(body.questionId);
      const verifiedAnswer = await this.quizChoiceService.verifiedAnswer(
        body.quizId,
        body.questionId,
        body.choiceId,
      );
      console.log(existedSitting);

      if (!existedSitting)
        throw this.exceptionService.badRequestException({ message: 'Invalid sitting ID' });

      if (existedSitting.isComplete)
        throw this.exceptionService.forbiddenException({
          message: 'This quiz has already completed',
        });

      if (!verifiedAnswer)
        throw this.exceptionService.forbiddenException({
          message: 'Invalid question ID or choice ID',
        });

      if (existedQuestion.multipleChoice && body.isMultipleChoice != 1)
        throw this.exceptionService.forbiddenException({ message: 'Invalid question format' });

      const newUpdated = await this.toQuizSittingEntity(existedSitting);
      newUpdated.userId = user.id;
      newUpdated.quizId = body.quizId;
      newUpdated.courseId = body.courseId;
      newUpdated.updatedBy = user.id;
      newUpdated.updatedAt = new Date().toISOString();

      console.log('🚀 ~ QuizSittingService ~ submit ~ existedQuestion:', existedQuestion);
      console.log('🚀 ~ QuizSittingService ~ submit ~ verifiedAnswer:', verifiedAnswer);

      // Case 1: Question is not multiple choice
      if (!existedQuestion.multipleChoice) {
        // If user has already submitted then throw error
        if (
          existedSitting.userAnswers != null &&
          existedSitting.userAnswers.includes(body.questionId.toString())
        )
          throw this.exceptionService.forbiddenException({
            message: 'This question has been submitted',
          });
        // Update user answers string format "<questionId>:<choiceId>"
        newUpdated.userAnswers += `${existedQuestion.id}:${verifiedAnswer.id};`;
        // Plus score if answer is correct
        if (verifiedAnswer.correct) newUpdated.currentScore++;
      }

      // Case 2: Question is multiple choice
      else {
        const tokens = this.multipleChoiceParser(existedSitting.userAnswers, existedQuestion.id);
        console.log('🚀 ~ QuizSittingService ~ submit ~ tokens:', tokens);
        // Case 2a: user did not include answers
        if (!tokens) {
          // Update user answers string format "<questionId>:<choiceId>"
          newUpdated.userAnswers += `${existedQuestion.id}:${verifiedAnswer.id};`;
          // Plus score if answer is correct
          if (verifiedAnswer.correct) newUpdated.currentScore++;
        }
        //Case 2b: user has selected choices
        else {
          //pass
        }
      }

      console.log('🚀 ~ QuizSittingService ~ submit ~ newUpdated:', newUpdated);
      return await this.repository.update({ id: sittingId }, { ...newUpdated });
    } catch (error) {
      this.logger.error('FINISH SITTING error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  multipleChoiceParser(userAnswers: string, questionId: number) {
    return userAnswers
      .split(';')
      .map((item) => {
        const tokens = item.split(':');
        return {
          questionId: parseInt(tokens[0]),
          choiceId: !tokens[1]?.includes(',')
            ? parseInt(tokens[1])
            : tokens[1].split(',').map((i) => parseInt(i)),
        };
      })
      .find((t) => t.questionId == questionId);
  }

  async verifyStudent(courseId: number, quizId: number, user: UserInfo) {
    try {
      const existedCourse = await this.courseService.findOneById(courseId);
      const existedQuiz = await this.quizService.findOne(quizId);
      const isCourseEnrolled = await this.courseService.checkStudentInCourse(courseId, user.id);
      if (!existedCourse || !existedQuiz)
        throw this.exceptionService.badRequestException({
          message: 'CourseId or QuizId cannot be found!',
        });
      if (existedQuiz.courseId !== existedCourse.id)
        throw this.exceptionService.badRequestException({
          message: 'Invalid quiz ID',
        });
      if (!isCourseEnrolled)
        throw this.exceptionService.badRequestException({
          message: 'User is not permitted to attempt this quiz',
        });
      return { course: existedCourse, quiz: existedQuiz };
    } catch (error) {
      this.logger.error('VERIFY STUDENT error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({ message: 'Bad Request' });
    }
  }

  async toQuizSittingEntity(quizSittingDto: any): Promise<QuizSitting> {
    const quiz = new QuizSitting();
    quiz.id = quizSittingDto?.id ? Number(quizSittingDto?.id) : quiz.id;
    quiz.quizId = quizSittingDto?.quizId ?? quiz.quizId;
    quiz.courseId = quizSittingDto?.courseId ?? quiz.courseId;
    quiz.userId = quizSittingDto?.userId ?? quiz.userId;
    quiz.currentScore = quizSittingDto.currentScore ?? quiz.currentScore;
    quiz.isComplete = quizSittingDto.isComplete ?? quiz.isComplete;
    quiz.startTime = quizSittingDto.startTime ?? quiz.startTime;
    quiz.endTime = quizSittingDto.endTime ?? quiz.endTime;
    quiz.userAnswers = quizSittingDto.userAnswers ?? quiz.userAnswers;
    quiz.updatedBy = quizSittingDto?.updatedBy ? Number(quizSittingDto.updatedBy) : null;
    quiz.updatedAt = quizSittingDto?.updatedAt ?? new Date().toISOString();
    quiz.createdBy = quizSittingDto?.createdBy ?? quiz.createdBy;
    return quiz;
  }
}
