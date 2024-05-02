import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';

export class QuizRepository extends BaseRepository<Quiz> {
  getEntityType(): EntityTarget<Quiz> {
    return Quiz;
  }

  async findOneById(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ['questionList', 'questionList.choices'],
    });
  }
  async findByCourseId(courseId: number) {
    return await this.repository
      .createQueryBuilder('quiz')
      .where('quiz.courseId = :courseId', { courseId })
      .getMany();
  }
  async studentFindByCourseId(courseId: number) {
    return await this.repository
      .createQueryBuilder('quiz_quiz')
      .where('quiz_quiz.courseId = :courseId', { courseId })
      .andWhere('quiz_quiz.active = :active', { active: true })
      .getMany();
  }
}
