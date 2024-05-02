import { generateString } from '@/common/helpers';
import slugify from 'slugify';
import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('course_video')
export class CourseVideo extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'title', nullable: false })
  title: string;

  @Column({ length: 500, name: 'slug', nullable: false })
  slug: string;

  @Column({ length: 5000, name: 'summary' })
  summary: string;

  @Column({ default: null, length: 500, name: 'video_name' })
  videoName: string;

  @Column({ default: null, length: 500, name: 'timestamp' })
  timestamp: string;

  @ManyToOne(() => Course, (course) => course.courseVideos)
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  courseId: number;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug =
      slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g, trim: true }) +
      '-' +
      generateString(5);
  }
}
