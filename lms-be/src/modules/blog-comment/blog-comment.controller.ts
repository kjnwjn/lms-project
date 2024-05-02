import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogCommentService } from './blog-comment.service';
import { CreateBlogCommentDto, UpdateBlogCommentDto } from './dto/blog-comment.dto';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { AuthenGuard } from '@/common/guards/authen.guard';

@ApiTags('blog-comment')
@Controller('blog-comment')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {
    /**Empty */
  }

  @UseGuards(AuthenGuard)
  @Post()
  async create(@Body() createBlogCommentDto: CreateBlogCommentDto, @User() user: UserInfo) {
    return await this.blogCommentService.create(createBlogCommentDto, user);
  }

  @Get('blog/:blogId')
  async findAllByBlogId(@Param('blogId', ParseIntPipe) blogId: number) {
    return await this.blogCommentService.findAllByBlogId(blogId);
  }

  @UseGuards(AuthenGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogComment: UpdateBlogCommentDto,
    @User() user: UserInfo,
  ) {
    return this.blogCommentService.update(+id, updateBlogComment, user);
  }

  @UseGuards(AuthenGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: UserInfo) {
    return this.blogCommentService.remove(+id, user);
  }
}
