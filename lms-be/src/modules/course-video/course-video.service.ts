import { XloggerService } from '@/common/Xlogger/Xlogger.service';
import { BaseService } from '@/common/base/service/base.service';
import { UserInfo } from '@/common/decorators/user.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { ExceptionsService } from '@/common/exceptions/exceptions.service';
import { checkRoleUser } from '@/common/helpers';
import { Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { FileGeneralService } from '../file-general/file-general.service';
import { CourseVideo } from './entities/course-video.entity';
import { CourseVideoRepository } from './repository/course-video.repository';

@Injectable()
export class CourseVideoService extends BaseService<CourseVideo, CourseVideoRepository> {
  constructor(
    protected readonly repository: CourseVideoRepository,
    private readonly courseService: CourseService,
    private readonly fileGeneralService: FileGeneralService,
    private readonly logger: XloggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super(repository);
  }
  async create(createCourseVideoDto: any, user: UserInfo): Promise<CourseVideo> {
    try {
      this.logger.log(`Creating courseVideo: ${JSON.stringify(createCourseVideoDto)}`);
      const isCourseExist = await this.courseService.findOneById(createCourseVideoDto.courseId);
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({ message: 'Course not found' });
      if (checkRoleUser(user, UserType.LECTURER) && isCourseExist.email !== user.email)
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      createCourseVideoDto.createdBy = user.id;
      const courseVideo = await this.toCourseVideoEntity(createCourseVideoDto);
      await this.repository.saveData(courseVideo);
      return courseVideo;
    } catch (error) {
      this.logger.error(`Error creating courseVideo: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad request' });
    }
  }

  async uploadVideoFile(
    courseVideoId: number,
    file: Express.Multer.File,
    user: UserInfo,
  ): Promise<CourseVideo> {
    try {
      this.logger.log(`Uploading document file for videoId: ${courseVideoId}`);
      const isCourseVideoExist = await this.repository.findOne({ id: courseVideoId });
      if (!isCourseVideoExist)
        throw this.exceptionService.notFoundException({ message: 'CourseVideo not found' });
      const isCourseExist = await this.courseService.findOneById(isCourseVideoExist.courseId);
      if (isCourseExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const videoName = await this.fileGeneralService.uploadPublicFile(file);
      return await this.repository.update(courseVideoId, { videoName, updatedBy: user.id });
    } catch (error) {
      this.logger.error(`Error in uploadDocFile: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  /**
   * Service for STUDENT get list videos course
   */
  async findListVideoInCourse(courseId: number) {
    try {
      this.logger.log(`Finding list courseVideo in course: ${courseId}`);
      const listVideos = await this.repository.findByCourseId(courseId);
      return listVideos;
    } catch (error) {
      this.logger.error(`Error in findlistVideosInCourse: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  /**
   * Service for STUDENT get pre-sign url docs course
   */
  async studentFindVideoPreSignUrl(
    videoId: number,
    courseId: number,
    user: UserInfo,
  ): Promise<string> {
    try {
      this.logger.log(`Finding pre sign url for videoId: ${videoId}`);
      const isUserHasPms = await this.courseService.checkStudentInCourse(courseId, Number(user.id));
      if (!isUserHasPms)
        throw this.exceptionService.forbiddenException({ message: 'User not in this course' });
      const isCourseVideoExist = await this.repository.findOne({ id: videoId });
      if (!isCourseVideoExist)
        throw this.exceptionService.notFoundException({ message: 'CourseVideo not found' });
      if (!isCourseVideoExist.videoName)
        throw this.exceptionService.notFoundException({ message: 'File not found' });
      return await this.fileGeneralService.generatePresignedUrl(
        process.env.BUCKET_NAME,
        isCourseVideoExist.videoName,
        process.env.PRIVATE_FILE_EXPIRE_TIME,
      );
    } catch (error) {
      this.logger.error(`Error in studentFindVideoPreSignUrl: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * Service for LECTURER and ADMIN get list video course
   */
  async findListVideo(courseId: number, user: UserInfo) {
    try {
      this.logger.log(`Finding list video in course: ${courseId}`);
      const isCourseExist = await this.courseService.findOneById(courseId);
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({ message: 'Course not found' });
      if (isCourseExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const listVideo = await this.repository.findByCourseId(courseId);
      return listVideo;
    } catch (error) {
      this.logger.error(`Error in findListVideo: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * Service for LECTURER and ADMIN  get pre-sign url video course
   */
  async getVideoUrl(videoId: number, courseId: number, user: UserInfo): Promise<string> {
    try {
      this.logger.log(`Finding pre sign url for videoId: ${videoId}`);
      const isCourseExist = await this.courseService.findOneById(courseId);
      if (isCourseExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const isCourseVideoExist = await this.repository.findOne({ id: videoId });
      if (!isCourseVideoExist)
        throw this.exceptionService.notFoundException({ message: 'CourseVideo not found' });
      if (!isCourseVideoExist.videoName)
        throw this.exceptionService.notFoundException({ message: 'File not found' });
      return await this.fileGeneralService.generatePresignedUrl(
        process.env.BUCKET_NAME,
        isCourseVideoExist.videoName,
        process.env.PRIVATE_FILE_EXPIRE_TIME,
      );
    } catch (error) {
      this.logger.error(`Error in findVideoPreSignUrl: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }
  /**
   * Service for LECTURER and ADMIN remove docs course
   */
  async removeVideo(videoId: number, courseId: number, user: UserInfo) {
    try {
      this.logger.log(`Finding list docs in course: ${courseId}`);
      const isCourseExist = await this.courseService.findOneById(courseId);
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({ message: 'Course not found' });
      if (isCourseExist.email !== user.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.forbiddenException({ message: 'Forbidden' });
      const isCourseDocsExist = await this.repository.findOne({ id: videoId });
      if (!isCourseDocsExist)
        throw this.exceptionService.notFoundException({ message: 'CourseVideo not found' });
      const isRemove = await this.repository.delete(Number(videoId));
      return `Remove ${isRemove.affected} docs`;
    } catch (error) {
      this.logger.error(`Error in removeVideo: ${error.message}`);
      this.exceptionService.badRequestException({ message: 'Bad Request' });
    }
  }

  async toCourseVideoEntity(courseVideoDto: any): Promise<CourseVideo> {
    const courseVideo = new CourseVideo();
    courseVideo.id = courseVideoDto?.id ? Number(courseVideoDto?.id) : courseVideo.id;
    courseVideo.title = courseVideoDto?.title ?? courseVideo.title;
    courseVideo.summary = courseVideoDto?.summary ?? courseVideo.summary;
    courseVideo.courseId = courseVideoDto?.courseId ?? courseVideo.courseId;
    courseVideo.createdBy = courseVideoDto?.createdBy
      ? Number(courseVideoDto.createdBy)
      : courseVideo.createdBy;
    courseVideo.updatedBy = courseVideoDto?.updatedBy ? Number(courseVideoDto.updatedBy) : null;
    return courseVideo;
  }
}
