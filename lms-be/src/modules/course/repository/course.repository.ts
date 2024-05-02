import { BaseRepository } from 'src/common/base/repository/base.repository';
import { Course } from '../entities/course.entity';
import { EntityTarget } from 'typeorm';

export class CourseRepository extends BaseRepository<Course> {
  getEntityType(): EntityTarget<Course> {
    return Course;
  }
  async findAllCourses() {
    return await this.repository.find({
      relations: ['quizSittings', 'courseDocs', 'courseVideos', 'quizs', 'levelId', 'users'],
    });
  }
  findRelations(relations: Array<string>, active: boolean = true) {
    return this.repository.find({ where: { active }, relations: relations });
  }

  async findCoursesByLevel(levelId: number) {
    return await this.repository.findBy({ levelId: levelId, active: true });
  }
  async findOneRelations(id: number, relations: any) {
    return await this.repository.findOne({
      where: { id },
      relations: relations,
    });
  }

  async findUserInCourse(courseId: number, userId: number) {
    return await this.repository
      .createQueryBuilder('course')
      .leftJoin('course.users', 'user')
      .where('course.id = :courseId', { courseId })
      .andWhere('user.id = :userId', { userId })
      .getOne();
  }

  async findCourseByIdUser(userId: number, active: boolean = true) {
    return await this.repository
      .createQueryBuilder('course')
      .leftJoin('course.users', 'user')
      .where('course.active = :active', { active })
      .andWhere('user.id = :userId', { userId })
      .getMany();
  }
}
