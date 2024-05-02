import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { CourseDocs } from '../entities/course-docs.entity';

export class CourseDocsRepository extends BaseRepository<CourseDocs> {
  getEntityType(): EntityTarget<CourseDocs> {
    return CourseDocs;
  }

  async findOneRelations(id: number, relations: any) {
    return await this.repository.findOne({
      where: { id },
      relations: relations,
    });
  }
  async findByCourseId(courseId: number) {
    return await this.repository
      .createQueryBuilder('course_docs')
      .where('course_docs.courseId = :courseId', { courseId })
      .getMany();
  }
}
