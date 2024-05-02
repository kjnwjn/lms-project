import { generateString } from '@/common/helpers';
import { BlogComment } from '@/modules/blog-comment/entities/blog-comment.entity';
import { User } from '@/modules/user/entities/user.entity';
import slugify from 'slugify';
import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blog')
export class Blog extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'title' })
  title: string;

  @Column({ length: 500, name: 'slug' })
  slug: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ length: 2048, name: 'desc', nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.blogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  categoryId: number;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: number;

  @OneToMany(() => BlogComment, (blog_comment) => blog_comment.blogId)
  blogComments: BlogComment[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug =
      slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g, trim: true }) +
      '-' +
      generateString(5);
  }
}
