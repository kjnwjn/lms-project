import { XloggerService } from '@/common/Xlogger/Xlogger.service';
import { FILE_DOC_SIZE } from '@/common/constants';
import { Roles } from '@/common/decorators/role.decorator';
import { User, UserInfo } from '@/common/decorators/user.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { ExceptionsService } from '@/common/exceptions/exceptions.service';
import { AuthenGuard } from '@/common/guards/authen.guard';
import { AuthorGuard } from '@/common/guards/author.guard';
import { pdfFileFilter } from '@/common/helpers/file.helpers';
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
import { CourseDocsService } from './course-docs.service';
import { CreateCourseDocDto } from './dto/create-course-doc.dto';
import { CourseDocs } from './entities/course-docs.entity';

@ApiTags('course-docs')
@Controller('course-docs')
export class CourseDocsController {
  constructor(
    private readonly courseDocsService: CourseDocsService,
    private readonly exceptionsService: ExceptionsService,
    private readonly loggerService: XloggerService,
  ) {
    /**Empty */
  }

  /**
   * Controller for LECTURER and ADMIN create docs
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @Post()
  async create(@Body() createCourseDocDto: CreateCourseDocDto, @User() user: UserInfo) {
    return await this.courseDocsService.create(createCourseDocDto, user);
  }
  /**
   * Controller for LECTURER and ADMIN upload docs
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @UseInterceptors(
    FileInterceptor('document', {
      fileFilter: pdfFileFilter,
      limits: {
        fileSize: FILE_DOC_SIZE,
      },
    }),
  )
  @Patch('/update-document-file')
  async uploadDocFile(
    @Query('courseDocsId') courseDocsId: number,
    @User() user: UserInfo,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: FILE_DOC_SIZE })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CourseDocs> {
    try {
      return await this.courseDocsService.uploadDocFile(courseDocsId, file, user);
    } catch (error) {
      this.loggerService.error(`Error in uploadDocFile: ${error.message}`);
      this.exceptionsService.badRequestException({ message: 'Bad Request' });
    }
  }

  /**
   * Controller for STUDENT get list docs
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Get('get-docs-by-course-id/student')
  async findListCourseDocsInCourse(@Query('courseId', ParseIntPipe) courseId: number) {
    return await this.courseDocsService.findListCourseDocsInCourse(courseId);
  }

  /**
   * Controller for STUDENT get pre-sign url docs course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.STUDENT)
  @Get('get-docs-url/student')
  async findDocsPreSignUrl(
    @Query('courseDocsId') courseDocsId: number,
    @Query('courseId') courseId: number,
    @User() user: UserInfo,
  ): Promise<string> {
    return await this.courseDocsService.studentFindDocsPreSignUrl(courseDocsId, courseId, user);
  }
  /**
   * Controller for LECTURER and ADMIN get list docs course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @Get('get-docs-by-course-id')
  async findListDocs(@Query('courseId', ParseIntPipe) courseId: number, @User() user: UserInfo) {
    return await this.courseDocsService.findListDocs(courseId, user);
  }

  /**
   * Controller for ADMIN and LECTURER get pre-sign url docs course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.ADMIN, UserType.LECTURER)
  @Get('get-docs-url')
  async getDocsUrl(
    @Query('courseDocsId') courseDocsId: number,
    @Query('courseId') courseId: number,
    @User() user: UserInfo,
  ): Promise<string> {
    return await this.courseDocsService.getDocsUrl(courseDocsId, courseId, user);
  }
  /**
   * Controller for ADMIN and LECTURER get pre-sign url docs course
   */
  @UseGuards(AuthenGuard)
  @UseGuards(AuthorGuard)
  @Roles(UserType.LECTURER, UserType.ADMIN)
  @Delete('delete-docs-by-course-id')
  async remove(
    @Query('courseDocsId') courseDocsId: number,
    @Query('courseId') courseId: number,
    @User() user: UserInfo,
  ) {
    return await this.courseDocsService.removeDocs(courseDocsId, courseId, user);
  }
}
