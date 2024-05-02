import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { Blog } from '../entities/blog.entity';

@Injectable()
export class BlogRepository extends BaseRepository<Blog> {
  getEntityType(): EntityTarget<Blog> {
    return Blog;
  }

  async findOrderByCreateDate() {
    return await this.repository.find({
      where: {
        active: true,
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['categoryId', 'userId', 'blogComments'],
    });
  }

  async findByCateId(categoryId: number) {
    return await this.repository
      .createQueryBuilder('blog')
      .where('blog.categoryId = :categoryId', { categoryId })
      .orderBy('blog.createdAt', 'DESC')
      .leftJoinAndSelect('blog.userId', 'userId')
      .leftJoinAndSelect('blog.blogComments', 'blogComments')
      .getMany();
  }

  async findByUserId(userId: number) {
    return await this.repository
      .createQueryBuilder('blog')
      .where('blog.userId = :userId', { userId })
      .orderBy('blog.createdAt', 'DESC')
      .leftJoinAndSelect('blog.categoryId', 'categoryId')
      .leftJoinAndSelect('blog.blogComments', 'blogComments')
      .getMany();
  }
  async deleteBlogById(id: number) {
    return await this.repository.delete(id);
  }
}
