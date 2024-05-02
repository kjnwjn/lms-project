import { Injectable } from '@nestjs/common';
import { BlogCommentRepository } from './repository/blog-comment.repository';
import { BaseService } from '@/common/base/service/base.service';
import { BlogComment } from './entities/blog-comment.entity';
import { XloggerService } from '@/common/Xlogger/Xlogger.service';
import { ExceptionsService } from '@/common/exceptions/exceptions.service';
import { CreateBlogCommentDto, UpdateBlogCommentDto } from './dto/blog-comment.dto';
import { UserInfo } from '@/common/decorators/user.decorator';
import { BlogService } from '../blog/blog.service';
import { UserType } from '@/common/enums/userType.enum';
import { checkRoleUser } from '@/common/helpers';

@Injectable()
export class BlogCommentService extends BaseService<BlogComment, BlogCommentRepository> {
  constructor(
    protected readonly repository: BlogCommentRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly logger: XloggerService,
    private readonly blogService: BlogService,
  ) {
    super(repository);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createBlogCommentDto: CreateBlogCommentDto, user: UserInfo): Promise<BlogComment> {
    try {
      this.logger.log(`Create Blog Comment information: ${JSON.stringify(createBlogCommentDto)}`);
      const isBlogExist = await this.blogService.findOne(createBlogCommentDto.blogId);
      if (!isBlogExist) {
        throw this.exceptionService.notFoundException({
          message: 'blog not found',
        });
      }
      createBlogCommentDto.createdBy = user.id;
      createBlogCommentDto.email = user.email;
      const blogComment = await this.toBlogCommentEntity(createBlogCommentDto);
      await this.repository.saveData(blogComment);
      return blogComment;
    } catch (error) {
      this.logger.error(`Error in create blog comment: ${error.message}`);
      throw this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  async findAllByBlogId(blogId: number): Promise<BlogComment[]> {
    try {
      this.logger.log('Find by blog id blog comment call: ' + blogId);
      const data = await this.repository.findByBlogId(blogId);
      if (data.length < 1)
        throw this.exceptionService.notFoundException({
          message: 'List blog empty',
        });
      return data;
    } catch (error) {
      this.logger.error(
        'Find by blog id blog comment call error: [' + JSON.stringify(error.message) + ']',
      );
      this.exceptionService.badRequestException({ message: error.message });
    }
  }
  async update(
    id: number,
    updateBlogComment: UpdateBlogCommentDto,
    user: UserInfo,
  ): Promise<BlogComment> {
    try {
      this.logger.log(
        'UPDATE blog comment ' + id + ' information: [' + JSON.stringify(updateBlogComment) + ']',
      );
      let isBlogCommentExist: BlogComment;
      if (checkRoleUser(user, UserType.ADMIN)) {
        isBlogCommentExist = await this.repository.findOne({ id });
      } else {
        isBlogCommentExist = await this.repository.findOne({ id, email: user.email });
      }
      if (!isBlogCommentExist)
        throw this.exceptionService.notFoundException({
          message: `blog comment ${id} not found.`,
        });
      const data = await this.repository.update(id, {
        ...updateBlogComment,
        updatedBy: Number(user.id),
      });
      return data;
    } catch (error) {
      this.logger.error(
        'UPDATE blog comment ' + id + ' information error: [' + JSON.stringify(error.message) + ']',
      );
      this.exceptionService.badRequestException({ message: error.message });
    }
  }

  async remove(id: number, user: UserInfo) {
    try {
      this.logger.log('REMOVE blog comment information: [' + JSON.stringify(id) + ']');
      let blogCommentExist: BlogComment;
      if (checkRoleUser(user, UserType.ADMIN)) {
        blogCommentExist = await this.repository.findOne({ id });
      } else {
        blogCommentExist = await this.repository.findOne({ id, email: user.email });
      }
      if (!blogCommentExist)
        throw this.exceptionService.notFoundException({
          message: `blog ${id} not found.`,
        });
      return await this.repository.delete(id);
    } catch (error) {
      this.logger.error(
        'REMOVE blog comment information error: [' + JSON.stringify(error.message) + ']',
      );
      throw this.exceptionService.badRequestException({
        message: error?.message,
      });
    }
  }

  toBlogCommentEntity(blogCommentDto: CreateBlogCommentDto): BlogComment {
    const blogComment = new BlogComment();
    blogComment.desc = blogCommentDto.desc;
    blogComment.email = blogCommentDto.email;
    blogComment.blogId = blogCommentDto.blogId;
    blogComment.createdBy = Number(blogCommentDto.createdBy);
    return blogComment;
  }
}
