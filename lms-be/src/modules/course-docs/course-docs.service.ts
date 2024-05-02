import { XloggerService } from '@/common/Xlogger/Xlogger.service';
import { BaseService } from '@/common/base/service/base.service';
import { UserInfo } from '@/common/decorators/user.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { ExceptionsService } from '@/common/exceptions/exceptions.service';
import { checkRoleUser } from '@/common/helpers';
import { Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { FileGeneralService } from '../file-general/file-general.service';
import { CourseDocs } from './entities/course-docs.entity';
import { CourseDocsRepository } from './repository/course-docs.repository';

@Injectable()
export class CourseDocsService extends BaseService<CourseDocs, CourseDocsRepository> {
  constructor(
    protected readonly repository: CourseDocsRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly courseService: CourseService,
    private readonly fileGeneralService: FileGeneralService,
    private readonly logger: XloggerService,
  ) {
    super(repository);
  }
  /**
   * Service for LECTURER and ADMIN create docs course
   */
  async create(createCourseDocDto: any, user: UserInfo): Promise<CourseDocs> {
    try {
      this.logger.log(`Creating courseDocs: ${JSON.stringify(createCourseDocDto)}`);
      const course = await this.courseService.findOneById(createCourseDocDto.courseId);
      if (!course) {
        throw this.exceptionService.notFoundException({
          message: 'Course not found',
        });
      }
      if (checkRoleUser(user, UserType.LECTURER) && course.email !== user.email)
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      createCourseDocDto.createdBy = user.id;
      const courseDocs = await this.toCourseDocsEntity(createCourseDocDto);
      await this.repository.saveData(courseDocs);
      return courseDocs;
    } catch (error) {
      this.logger.error(`Error in create courseDocs: ${error.message}`);
      throw this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  async uploadDocFile(
    courseDocsId: number,
    file: Express.Multer.File,
    user: UserInfo,
  ): Promise<CourseDocs> {
    try {
      this.logger.log(`Uploading document file for courseDocsId: ${courseDocsId}`);
      const isCourseDocsExist = await this.repository.findOne({ id: courseDocsId });
      if (!isCourseDocsExist)
        throw this.exceptionService.notFoundException({ message: 'CourseDocs not found' });
      const isCourseExist = await this.courseService.findOneById(isCourseDocsExist.courseId);
      if (isCourseExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const fileName = await this.fileGeneralService.uploadPublicFile(file);
      return await this.repository.update(courseDocsId, { fileName, updatedBy: user.id });
    } catch (error) {
      this.logger.error(`Error in uploadDocFile: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * Service for STUDENT get list docs course
   */
  async findListCourseDocsInCourse(courseId: number) {
    try {
      this.logger.log(`Finding list courseDocs in course: ${courseId}`);
      const listCourseDocs = await this.repository.findByCourseId(courseId);
      return listCourseDocs;
    } catch (error) {
      this.logger.error(`Error in findListCourseDocsInCourse: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * Service for STUDENT get pre-sign url docs course
   */
  async studentFindDocsPreSignUrl(
    courseDocsId: number,
    courseId: number,
    user: UserInfo,
  ): Promise<string> {
    try {
      this.logger.log(`Finding pre sign url for courseDocsId: ${courseDocsId}`);
      const isUserHasPms = await this.courseService.checkStudentInCourse(courseId, Number(user.id));
      if (!isUserHasPms)
        throw this.exceptionService.forbiddenException({ message: 'User not in this course' });
      const isCourseDocsExist = await this.repository.findOne({ id: courseDocsId });
      if (!isCourseDocsExist)
        throw this.exceptionService.notFoundException({ message: 'CourseDocs not found' });
      if (!isCourseDocsExist.fileName)
        throw this.exceptionService.notFoundException({ message: 'File not found' });
      return await this.fileGeneralService.generatePresignedUrl(
        process.env.BUCKET_NAME,
        isCourseDocsExist.fileName,
        process.env.PRIVATE_FILE_EXPIRE_TIME,
      );
    } catch (error) {
      this.logger.error(`Error in findDocsPreSignUrl: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * Service for LECTURER and ADMIN get list docs course
   */
  async findListDocs(courseId: number, user: UserInfo) {
    try {
      this.logger.log(`Finding list docs in course: ${courseId}`);
      const isCourseExist = await this.courseService.findOneById(courseId);
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({ message: 'Course not found' });
      if (isCourseExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const listCourseDocs = await this.repository.findByCourseId(courseId);
      return listCourseDocs;
    } catch (error) {
      this.logger.error(`Error in findListDocs: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * Service for LECTURER and ADMIN  get pre-sign url docs course
   */
  async getDocsUrl(courseDocsId: number, courseId: number, user: UserInfo): Promise<string> {
    try {
      this.logger.log(`Finding pre sign url for courseDocsId: ${courseDocsId}`);
      const isCourseExist = await this.courseService.findOneById(courseId);
      if (isCourseExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const isCourseDocsExist = await this.repository.findOne({ id: courseDocsId });
      if (!isCourseDocsExist)
        throw this.exceptionService.notFoundException({ message: 'CourseDocs not found' });
      if (!isCourseDocsExist.fileName)
        throw this.exceptionService.notFoundException({ message: 'File not found' });
      return await this.fileGeneralService.generatePresignedUrl(
        process.env.BUCKET_NAME,
        isCourseDocsExist.fileName,
        process.env.PRIVATE_FILE_EXPIRE_TIME,
      );
    } catch (error) {
      this.logger.error(`Error in findDocsPreSignUrl: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * Service for LECTURER and ADMIN remove docs course
   */
  async removeDocs(courseDocsId: number, courseId: number, user: UserInfo) {
    try {
      this.logger.log(`Finding list docs in course: ${courseId}`);
      const isCourseExist = await this.courseService.findOneById(courseId);
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({ message: 'Course not found' });
      if (isCourseExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const isCourseDocsExist = await this.repository.findOne({ id: courseDocsId });
      if (!isCourseDocsExist)
        throw this.exceptionService.notFoundException({ message: 'CourseDocs not found' });
      const isRemove = await this.repository.delete(courseDocsId);
      return `Remove ${isRemove.affected} docs`;
    } catch (error) {
      this.logger.error(`Error in removeDocs: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  async toCourseDocsEntity(courseDocsDto: any): Promise<CourseDocs> {
    const courseDocs = new CourseDocs();
    courseDocs.id = courseDocsDto?.id ? Number(courseDocsDto?.id) : courseDocs.id;
    courseDocs.title = courseDocsDto?.title ?? courseDocs.title;
    courseDocs.courseId = courseDocsDto?.courseId ?? courseDocs.courseId;
    courseDocs.createdBy = courseDocsDto?.createdBy
      ? Number(courseDocsDto.createdBy)
      : courseDocs.createdBy;
    courseDocs.updatedBy = courseDocsDto?.updatedBy ? Number(courseDocsDto.updatedBy) : null;
    return courseDocs;
  }
}
