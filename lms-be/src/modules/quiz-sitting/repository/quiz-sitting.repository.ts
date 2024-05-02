import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { QuizSitting } from '../entities/quiz-sitting.entity';

export class QuizSittingRepository extends BaseRepository<QuizSitting> {
  getEntityType(): EntityTarget<QuizSitting> {
    return QuizSitting;
  }

  async verifyQuiz(courseId: number, quizId: number, userId: number) {
    return await this.repository
      .createQueryBuilder('quiz_sitting')
      .where('quiz_sitting.courseId = :courseId', { courseId })
      .andWhere('quiz_sitting.userId = :userId', { userId })
      .andWhere('quiz_sitting.quizId = :quizId', { quizId })
      .getOne();
  }

  async verifyOwner(quizSittingId: number, userId: number) {
    return await this.repository
      .createQueryBuilder('quiz_sitting')
      .where('quiz_sitting.id = :quizSittingId', { quizSittingId })
      .andWhere('quiz_sitting.userId = :userId', { userId })
      .getOne();
  }
  async findAllByStudent(quizId: number, quizSittingId: number, userId: number) {
    return await this.repository
      .createQueryBuilder('quiz_sitting')
      .where('quiz_sitting.id = :quizSittingId', { quizSittingId })
      .andWhere('quiz_sitting.quizId = :quizId', { quizId })
      .andWhere('quiz_sitting.userId = :userId', { userId })
      .getOne();
  }

  async findAllByQuizId(quizId: number, userId: number) {
    return await this.repository
      .createQueryBuilder('quiz_sitting')
      .where('quiz_sitting.quizId = :quizId', { quizId })
      .andWhere('quiz_sitting.userId = :userId', { userId })
      .getMany();
  }
}
