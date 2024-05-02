import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { QuizQuestion } from '../entities/quiz-question.entity';

export class QuizQuestionRepository extends BaseRepository<QuizQuestion> {
  getEntityType(): EntityTarget<QuizQuestion> {
    return QuizQuestion;
  }
  async findQuizQuestionByQuizId(quizId: number) {
    return await this.repository
      .createQueryBuilder('quiz-question')
      .leftJoin('quiz-question.quizId', 'quiz')
      .where('quiz-question.quizId = :quizId', { quizId })
      .leftJoinAndSelect('quiz-question.choices', 'choices')
      .getMany();
  }
}
