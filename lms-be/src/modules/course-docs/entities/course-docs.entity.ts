import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course_docs')
export class CourseDocs extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'title' })
  title: string;

  @Column({ default: null, length: 500, name: 'file_name' })
  fileName: string;

  @ManyToOne(() => Course, (course) => course.courseDocs)
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  courseId: number;
}
