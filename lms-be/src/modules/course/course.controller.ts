import { FILE_IMAGE_SIZE } from '@/common/constants';
import { Roles } from '@/common/decorators/role.decorator';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { AuthorGuard } from '@/common/guards/author.guard';
import { imageFileFilter } from '@/common/helpers/file.helpers';
import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { AdminCreateCourseDto, CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {
    /**Empty */
  }

  /**
   * Controller for admin create course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Post('admin')
  async create(@Body() body: AdminCreateCourseDto, @User() user: UserInfo) {
    return await this.courseService.create(body, user);
  }

  /**
   * Controller for lecturer create course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER)
  @Post('lecturer')
  async lecturerCreateCourse(@Body() body: CreateCourseDto, @User() user: UserInfo) {
    return await this.courseService.create(body, user);
  }

  /**
   * Controller for admin upload thumbnail for course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: FILE_IMAGE_SIZE,
      },
    }),
  )
  @Patch('/:id/update-thumbnail/admin')
  async adminUpdateThumbnail(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserInfo,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: FILE_IMAGE_SIZE })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<string> {
    return await this.courseService.updateThumbnail(id, file, user);
  }

  /**
   * Controller for admin upload thumbnail for course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: FILE_IMAGE_SIZE,
      },
    }),
  )
  @Patch('/:id/update-thumbnail/lecturer')
  async lecturerUpdateThumbnail(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserInfo,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: FILE_IMAGE_SIZE })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<string> {
    return await this.courseService.updateThumbnail(id, file, user);
  }
  /**
   * Controller for admin or lecturer update course information
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Patch(':id')
  async updateCourseInformation(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCourseDto,
    @User() user: UserInfo,
  ) {
    return await this.courseService.update(+id, body, user);
  }

  /**
   * Controller find all course
   */
  @UseGuards(AuthenGuard)
  @Get()
  async findAll() {
    const data = await this.courseService.findAll();
    return data;
  }

  /**
   * Controller find all course by admin
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN)
  @Get('admin/get-all')
  async findAllByAdmin() {
    const data = await this.courseService.findAllByAdmin();
    return data;
  }

  /**
   * Controller find course by level id
   */
  @UseGuards(AuthenGuard)
  @Get('level/:id')
  async findCoursesByLevel(@Param('id') id: number) {
    const data = await this.courseService.findByLevelId(id);
    return data;
  }

  /**
   * Controller find course by level id
   */
  @UseGuards(AuthenGuard)
  @Get('/slug/:slug')
  async findCourseBySlug(@Param('slug') slug: string) {
    const data = await this.courseService.findBySlug(slug);
    return data;
  }
  /**
   * Controller find course by id course
   */
  @UseGuards(AuthenGuard)
  @Get(':id')
  async findCourseById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.courseService.findOneById(id);
    return data;
  }
  /**
   * Controller find course by id course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @Patch('active/:id')
  async activeCourse(@Param('id', ParseIntPipe) id: number, @User() user: UserInfo) {
    const data = await this.courseService.activeCourse(id, user);
    return data;
  }

  /**
   * Controller find courses by id student
   */
  @UseGuards(AuthenGuard)
  @Get('user/:id')
  async findCoursesByUserId(@Param('id', ParseIntPipe) userId: number) {
    const data = await this.courseService.findCoursesByUserId(userId);
    return data;
  }
}
