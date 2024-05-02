import { Blog } from '@/modules/blog/entities/blog.entity';
import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'name' })
  name: string;

  @OneToMany(() => Blog, (blog) => blog.categoryId)
  blogs: Blog[];
}
