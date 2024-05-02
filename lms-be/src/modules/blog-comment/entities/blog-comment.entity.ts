import { Blog } from '@/modules/blog/entities/blog.entity';
import { GenericEntity } from 'src/common/base/entity/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog_comment')
export class BlogComment extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 5000, name: 'desc' })
  desc: string;

  @ManyToOne(() => Blog, (blog) => blog.blogComments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id', referencedColumnName: 'id' })
  blogId: number;

  @ManyToOne(() => User, (user) => user.blogComments, { eager: true })
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  email: string;
}
