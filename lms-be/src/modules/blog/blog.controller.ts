import { User, UserInfo } from '@/common/decorators/user.decorator';
import { AuthenGuard } from '@/common/guards/authen.guard';
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
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { AuthorGuard } from '@/common/guards/author.guard';
import { UserType } from '@/common/enums/userType.enum';
import { Roles } from '@/common/decorators/role.decorator';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {
    /**Empty */
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Post()
  async create(@Body() createProductDto: CreateBlogDto, @User() user: UserInfo) {
    return await this.blogService.create(createProductDto, user);
  }

  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.blogService.findOne(+id);
  }

  @Get('find-by-category-id/:categoryId')
  async findByCategoryId(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.blogService.findByCategoryId(categoryId);
  }

  @Get('find-by-user-id/:userId')
  async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.blogService.findByUserId(userId);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @User() user: UserInfo,
  ) {
    return await this.blogService.update(+id, updateBlogDto, user);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @User() user: UserInfo) {
    return await this.blogService.remove(+id, user);
  }
}
