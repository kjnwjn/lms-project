import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('level')
export class Level extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ length: 500, name: 'name', unique: true })
  name: string;
  @Column({ length: 500, name: 'description' })
  description: string;
  @Column({ name: 'order' })
  order: number;
  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;
  @OneToMany(() => Course, (course) => course.id)
  courses: Course[];
}
