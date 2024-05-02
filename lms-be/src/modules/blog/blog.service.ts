import { UserInfo } from '@/common/decorators/user.decorator';
import { Injectable } from '@nestjs/common';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { CategoryService } from '../category/category.service';
import { Blog } from './entities/blog.entity';
import { BlogRepository } from './repository/blog.repository';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { checkRoleUser } from '@/common/helpers';
import { UserType } from '@/common/enums/userType.enum';

@Injectable()
export class BlogService {
  constructor(
    private readonly repository: BlogRepository,
    private readonly categoryService: CategoryService,
    private readonly exceptionService: ExceptionsService,
    private readonly logger: XloggerService,
  ) {
    /**Empty */
  }

  async create(body: CreateBlogDto, user: UserInfo) {
    this.logger.log('CREATE blog information: [' + JSON.stringify(body) + ']');

    const isCategoryExist = await this.categoryService.findOne(body.categoryId);

    if (!isCategoryExist)
      throw this.exceptionService.badRequestException({
        message: 'Category not found',
      });
    body.createdBy = user.id;
    body.userId = user.id;
    const newBlog = await this.repository.saveData(this.toBlogEntity(body));
    if (!newBlog)
      throw this.exceptionService.badRequestException({
        message: 'Create new blog failed',
      });
    return newBlog;
  }

  async findAll(): Promise<Blog[]> {
    try {
      this.logger.log('Find All blog api call');
      const data = await this.repository.findOrderByCreateDate();
      if (data.length < 1)
        throw this.exceptionService.notFoundException({
          message: 'List blog empty',
        });
      return data;
    } catch (error) {
      this.logger.error('Find All blog api call error: [' + JSON.stringify(error.message) + ']');
      this.exceptionService.badRequestException({ message: error.message });
    }
  }
  async findByCategoryId(cateId: number): Promise<Blog[]> {
    try {
      this.logger.log('Find by category id blog api call: ' + cateId);
      const data = await this.repository.findByCateId(cateId);
      if (data.length < 1)
        throw this.exceptionService.notFoundException({
          message: 'List blog empty',
        });
      return data;
    } catch (error) {
      this.logger.error('Find All blog api call error: [' + JSON.stringify(error.message) + ']');
      this.exceptionService.badRequestException({ message: error.message });
    }
  }

  async findByUserId(userId: number): Promise<Blog[]> {
    try {
      this.logger.log('Find by category id blog api call: ' + userId);
      const data = await this.repository.findByUserId(userId);
      if (data.length < 1)
        throw this.exceptionService.notFoundException({
          message: 'List blog empty',
        });
      return data;
    } catch (error) {
      this.logger.error('Find All blog api call error: [' + JSON.stringify(error.message) + ']');
      this.exceptionService.badRequestException({ message: error.message });
    }
  }

  async findOne(id: number): Promise<Blog> {
    try {
      this.logger.log('Find One blog information: [' + JSON.stringify(id) + ']');
      const blogExist = await this.repository.findOne({ id });
      if (!blogExist)
        throw this.exceptionService.notFoundException({
          message: `blog ${id} not found.`,
        });
      return blogExist;
    } catch (error) {
      this.logger.error('Find One blog information error: [' + JSON.stringify(error.message) + ']');
      this.exceptionService.badRequestException({ message: error.message });
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, user: UserInfo): Promise<Blog> {
    try {
      this.logger.log(
        'UPDATE blog ' + id + ' information: [' + JSON.stringify(updateBlogDto) + ']',
      );
      let blogExist: Blog;
      if (checkRoleUser(user, UserType.ADMIN)) {
        blogExist = await this.repository.findOne({ id });
      } else {
        blogExist = await this.repository.findOne({ id, userId: user.id });
      }
      if (!blogExist)
        throw this.exceptionService.notFoundException({
          message: `blog ${id} not found.`,
        });
      if (updateBlogDto.categoryId) {
        const isCategoryExist = await this.categoryService.findOne(updateBlogDto.categoryId);
        if (!isCategoryExist)
          throw this.exceptionService.notFoundException({
            message: `Category ${updateBlogDto.categoryId} not found.`,
          });
      }
      const data = await this.repository.update(id, {
        ...updateBlogDto,
        updatedBy: Number(user.id),
      });
      return data;
    } catch (error) {
      this.logger.error(
        'UPDATE blog ' + id + ' information error: [' + JSON.stringify(error.message) + ']',
      );
      this.exceptionService.badRequestException({ message: error.message });
    }
  }

  async remove(id: number, user: UserInfo) {
    try {
      this.logger.log('REMOVE blog information: [' + JSON.stringify(id) + ']');
      let blogExist: Blog;
      if (checkRoleUser(user, UserType.ADMIN)) {
        blogExist = await this.repository.findOne({ id });
      } else {
        blogExist = await this.repository.findOne({ id, userId: user.id });
      }
      if (!blogExist)
        throw this.exceptionService.notFoundException({
          message: `blog ${id} not found.`,
        });
      return await this.repository.delete(id);
    } catch (error) {
      this.logger.error('REMOVE blog information error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({
        message: error?.message,
      });
    }
  }

  toBlogEntity(blogDto: CreateBlogDto): Blog {
    const blog = new Blog();
    blog.title = blogDto.title;
    blog.userId = Number(blogDto.userId);
    blog.content = blogDto.content;
    blog.description = blogDto.description;
    blog.categoryId = blogDto.categoryId;
    blog.createdBy = Number(blogDto.createdBy);
    return blog;
  }
}
