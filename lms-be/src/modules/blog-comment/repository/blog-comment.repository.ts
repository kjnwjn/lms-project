import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { BlogComment } from '../entities/blog-comment.entity';

export class BlogCommentRepository extends BaseRepository<BlogComment> {
  getEntityType(): EntityTarget<BlogComment> {
    return BlogComment;
  }
  async findByBlogId(blogId: number) {
    return await this.repository
      .createQueryBuilder('blog_comment')
      .where('blog_comment.blogId = :blogId', { blogId })
      .leftJoinAndSelect('blog_comment.email', 'email')
      .orderBy('blog_comment.createdAt', 'DESC')
      .getMany();
  }
}
