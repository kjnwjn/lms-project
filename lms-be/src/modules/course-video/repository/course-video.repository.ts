import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { CourseVideo } from '../entities/course-video.entity';

@Injectable()
export class CourseVideoRepository extends BaseRepository<CourseVideo> {
  getEntityType(): EntityTarget<CourseVideo> {
    return CourseVideo;
  }
  async findByCourseId(courseId: number) {
    return await this.repository
      .createQueryBuilder('course_video')
      .where('course_video.courseId = :courseId', { courseId })
      .getMany();
  }
}
