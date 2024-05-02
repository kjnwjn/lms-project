import { GenericEntity } from 'src/common/base/entity/base.entity';
import { CourseDocs } from 'src/modules/course-docs/entities/course-docs.entity';
import { CourseVideo } from 'src/modules/course-video/entities/course-video.entity';
import { Level } from 'src/modules/level/entities/level.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import slugify from 'slugify';
import { generateString } from '@/common/helpers';
import { QuizSitting } from '@/modules/quiz-sitting/entities/quiz-sitting.entity';

@Entity('course_course')
export class Course extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'slug', nullable: false })
  slug: string;

  @Column({ length: 500, name: 'title', nullable: false })
  title: string;

  @Column({ default: null, length: 500, name: 'thumbnail' })
  thumbnail: string;

  @Column({ name: 'credit' })
  credit: number;

  @Column({ length: 500, nullable: false })
  email: string;

  @Column({ length: 5000, name: 'summary' })
  summary: string;

  @ManyToOne(() => Level, (level) => level.courses)
  @JoinColumn({ name: 'level_id', referencedColumnName: 'id' })
  levelId: number;

  @OneToMany(() => Quiz, (quiz) => quiz.courseId)
  quizs: Quiz[];

  @OneToMany(() => QuizSitting, (quiz) => quiz.courseId)
  quizSittings: QuizSitting[];

  @OneToMany(() => CourseDocs, (course_docs) => course_docs.courseId)
  courseDocs: CourseDocs[];

  @OneToMany(() => CourseVideo, (course_video) => course_video.courseId)
  courseVideos: CourseVideo[];

  @ManyToMany(() => User, (user) => user.courses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'users_course',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @BeforeInsert()
  setActive() {
    this.active = false;
  }
  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug =
      slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g, trim: true }) +
      '-' +
      generateString(5);
  }
}
