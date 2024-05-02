import { Course } from '../entities/course.entity';

export class CoursePresenter {
  id: number;
  slug: string;
  title: string;
  credit: number;
  email: string;
  summary: string;
  levelId: number;
  thumbnail: string;
  deletedAt: Date;
  constructor(partial: Partial<Course>) {
    Object.assign(this, partial);
  }
}
