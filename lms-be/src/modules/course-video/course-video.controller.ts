import { FILE_VIDEO_SIZE } from '@/common/constants';
import { Roles } from '@/common/decorators/role.decorator';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { AuthorGuard } from '@/common/guards/author.guard';
import { mp4FileFilter } from '@/common/helpers/file.helpers';
import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CourseVideoService } from './course-video.service';
import { CreateCourseVideoDto } from './dto/course-video.dto';
import { CourseVideo } from './entities/course-video.entity';

@ApiTags('course-video')
@Controller('course-video')
export class CourseVideoController {
  constructor(private readonly courseVideoService: CourseVideoService) {
    /**Empty */
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @Post()
  async create(@Body() createCourseVideoDto: CreateCourseVideoDto, @User() user: UserInfo) {
    return await this.courseVideoService.create(createCourseVideoDto, user);
  }

  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @UseInterceptors(
    FileInterceptor('video', {
      fileFilter: mp4FileFilter,
      limits: {
        fileSize: FILE_VIDEO_SIZE,
      },
    }),
  )
  @Patch('/upload-video-file')
  async uploadVideoFile(
    @Query('videoId') videoId: number,
    @User() user: UserInfo,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: FILE_VIDEO_SIZE })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CourseVideo> {
    return await this.courseVideoService.uploadVideoFile(videoId, file, user);
  }
  /**
   * Controller for STUDENT get list video
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Get('get-videos-by-course-id/student')
  async findListCourseDocsInCourse(@Query('courseId', ParseIntPipe) courseId: number) {
    return await this.courseVideoService.findListVideoInCourse(courseId);
  }
  /**
   * Controller for STUDENT get pre-sign url video course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Get('get-video-url/student')
  async findDocsPreSignUrl(
    @Query('videoId') videoId: number,
    @Query('courseId') courseId: number,
    @User() user: UserInfo,
  ): Promise<string> {
    return await this.courseVideoService.studentFindVideoPreSignUrl(videoId, courseId, user);
  }
  /**
   * Controller for LECTURER and ADMIN get list video course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @Get('get-videos-by-course-id')
  async findListVideo(@Query('courseId', ParseIntPipe) courseId: number, @User() user: UserInfo) {
    return await this.courseVideoService.findListVideo(courseId, user);
  }
  /**
   * Controller for ADMIN and LECTURER get pre-sign url video course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Get('get-video-url')
  async getDocsUrl(
    @Query('videoId') videoId: number,
    @Query('courseId') courseId: number,
    @User() user: UserInfo,
  ): Promise<string> {
    return await this.courseVideoService.getVideoUrl(videoId, courseId, user);
  }
  /**
   * Controller for ADMIN and LECTURER get pre-sign url docs course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @Delete('delete-video-by-course-id')
  async remove(
    @Query('videoId') videoId: number,
    @Query('courseId') courseId: number,
    @User() user: UserInfo,
  ) {
    return await this.courseVideoService.removeVideo(videoId, courseId, user);
  }
}
