import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { QuizChoice } from '../entities/quiz-choice.entity';

export class QuizChoiceRepository extends BaseRepository<QuizChoice> {
  getEntityType(): EntityTarget<QuizChoice> {
    return QuizChoice;
  }

  async findAllByQuestionId(questionId: number) {
    return await this.repository
      .createQueryBuilder('quiz-choice')
      .where('quiz-choice.questionId = :questionId', { questionId })
      .getMany();
  }

  async verifiedAnswer(quizId: number, questionId: number, choiceId: number) {
    //TODO QueryBuilder

    return await this.repository
      .createQueryBuilder('quiz_choice')
      .leftJoin('quiz_choice.questionId', 'quiz_question')
      .leftJoin('quiz_question.quizId', 'quiz')
      .where('quiz.id = :quizId', { quizId })
      .andWhere('quiz_question.id = :questionId', { questionId })
      .andWhere('quiz_choice.id = :choiceId', { choiceId })
      .getOne();
  }
}
