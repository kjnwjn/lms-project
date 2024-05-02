import { UserInfo } from '@/common/decorators/user.decorator';
import { UserType } from '@/common/enums/userType.enum';
import { checkRoleUser, getPublicFileUrl } from '@/common/helpers';
import { Injectable } from '@nestjs/common';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { BaseService } from 'src/common/base/service/base.service';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { FileGeneralService } from '../file-general/file-general.service';
import { LevelRepository } from '../level/repository/level.repository';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { UpdateCourseDto } from './dto/course.dto';
import { Course } from './entities/course.entity';
import { CoursePresenter } from './presenter/course.presenter';
import { CourseRepository } from './repository/course.repository';
import { level } from 'winston';

@Injectable()
export class CourseService extends BaseService<Course, CourseRepository> {
  constructor(
    protected readonly repository: CourseRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly levelRepository: LevelRepository,
    private readonly userRepository: UserRepository,
    private readonly fileGeneralService: FileGeneralService,
    private readonly logger: XloggerService,
  ) {
    super(repository);
  }

  async create(body: any, user: UserInfo): Promise<boolean> {
    try {
      this.logger.log('CREATE new course information: [' + JSON.stringify(body) + ']');
      const isLevelExist = await this.levelRepository.findOneBy({
        id: body.levelId,
      });
      if (!isLevelExist)
        throw this.exceptionService.badRequestException({
          message: `Level ${body.levelId} not found`,
        });
      if (body?.email) {
        const isUserExist: User = await this.userRepository.findOneUserByEmail(body.email);
        if (!isUserExist)
          throw this.exceptionService.notFoundException({
            message: `Email ${body.email} invalid`,
          });
        if (!checkRoleUser(user, UserType.ADMIN))
          throw this.exceptionService.badRequestException({
            message: `Account can not has permission! `,
          });
        body.createdBy = isUserExist.id;
      }
      body.createdBy = user.id;
      body.email = body.email ? body.email : user.email;
      const courseNew = await this.toCourseEntity(body);
      await this.repository.saveData(courseNew);
      return true;
    } catch (error) {
      this.logger.error('CREATE new user error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({
        message: 'Bad Request',
      });
    }
  }

  async updateThumbnail(id: number, file: Express.Multer.File, user: UserInfo): Promise<string> {
    try {
      this.logger.log('UPDATE course thumbnail: [' + file.fieldname + ']');
      const isCourseExist: Course = await this.repository.findOneBy({ id });
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({
          message: 'Course not found',
        });
      if (user.email !== isCourseExist.email && !checkRoleUser(user, UserType.ADMIN))
        throw this.exceptionService.forbiddenException({
          message: `User ${user.email} is not the owner of this course`,
        });
      const thumbnailName = await this.fileGeneralService.uploadPublicFile(
        file,
        process.env.BUCKET_PUBLIC_NAME,
      );
      const thumbnailUrl = getPublicFileUrl(process.env.BUCKET_PUBLIC_NAME, thumbnailName);
      isCourseExist.thumbnail = thumbnailUrl;
      isCourseExist.updatedBy = user.id;
      await this.repository.saveData(isCourseExist);
      return thumbnailUrl;
    } catch (error) {
      this.logger.error('UPDATE course thumbnail error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async checkStudentInCourse(courseId: number, userId: number): Promise<boolean> {
    try {
      this.logger.log(
        'checkStudentInCourse information: [' + 'courseId' + courseId + 'userId' + userId + ']',
      );
      const isCourseExist = await this.repository.findOne({ id: courseId });
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({ message: 'Course not found' });
      const isUserExist = await this.userRepository.findOne({ id: userId });
      if (!isUserExist)
        throw this.exceptionService.notFoundException({ message: 'User not found' });
      const userInCourse = await this.repository.findUserInCourse(courseId, userId);
      if (!userInCourse) return false;
      return true;
    } catch (error) {
      this.logger.error('checkStudentInCourse error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async findAll(): Promise<Course[]> {
    try {
      const courseList = await this.repository.findRelations(['users', 'levelId']);
      return courseList;
    } catch (error) {
      this.logger.error('GET all course error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }
  async findAllByAdmin(): Promise<Course[]> {
    try {
      const courseList = await this.repository.findAllCourses();
      return courseList;
    } catch (error) {
      this.logger.error('GET all course error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async findByLevelId(levelId: number): Promise<Course[]> {
    try {
      this.logger.log('GET course by level id api call]');
      const isLevelExist = await this.levelRepository.findOneBy({
        id: levelId,
      });
      if (!isLevelExist)
        throw this.exceptionService.badRequestException({
          message: `Level ${levelId} not found`,
        });
      const courseList = await this.repository.findCoursesByLevel(levelId);
      return courseList;
    } catch (error) {
      this.logger.error('GET course by level id error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async findOneById(id: number): Promise<Course> {
    try {
      this.logger.log('GET ONE course by id api call]');
      const course = await this.repository.findOneRelations(id, ['levelId']);
      return course;
    } catch (error) {
      this.logger.error('GET ONE course by id error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async findBySlug(slug: string): Promise<Course> {
    try {
      this.logger.log('GET ONE course by id api call]');
      const course = await this.repository.findOneBy({ slug });
      return course;
    } catch (error) {
      this.logger.error('GET ONE course by id error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async update(id: number, body: UpdateCourseDto, user: UserInfo): Promise<Course> {
    try {
      this.logger.log('UPDATE ONE course information: [' + JSON.stringify(body) + ']');
      const isCourseExist: Course = await this.repository.findOneRelations(id, ['levelId']);
      if (!isCourseExist)
        throw this.exceptionService.notFoundException({
          message: 'Course not found',
        });
      if (body?.email) {
        const isUserExist: User = await this.userRepository.findOneUserByEmail(body.email);
        if (!isUserExist)
          throw this.exceptionService.badRequestException({
            message: `Email ${body.email} is not a lecturer! `,
          });
        if (!checkRoleUser(isUserExist, UserType.LECTURER))
          throw this.exceptionService.badRequestException({
            message: `Account can not has permission! `,
          });
      }
      if (body?.levelId) {
        const isLevelExist = await this.levelRepository.findOneBy({
          id: body.levelId,
        });
        if (!isLevelExist)
          throw this.exceptionService.badRequestException({
            message: `Level ${body.levelId} not found`,
          });
      }
      return await this.repository.update(Number(isCourseExist.id), {
        ...body,
        updatedBy: Number(user.id),
      });
    } catch (error) {
      this.logger.error('UPDATE ONE course exception: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({
        message: error.message || 'Bad Request',
      });
    }
  }
  async activeCourse(id: number, user: UserInfo): Promise<Course> {
    try {
      this.logger.log('ACTIVE course information id: [' + JSON.stringify(id) + ']');
      const isCourseExist: Course = await this.repository.findOneRelations(id, [
        'users',
        'levelId',
        'quizs',
        'courseDocs',
        'courseVideos',
      ]);

      if (!isCourseExist.active) {
        if (
          !isCourseExist.thumbnail ||
          isCourseExist.courseDocs.length < 0 ||
          isCourseExist.courseVideos.length < 0 ||
          isCourseExist.quizs.length < 0
        ) {
          throw this.exceptionService.badRequestException({
            message: `You need to create course resource before active! `,
          });
        }
      }

      if (user.email !== isCourseExist.email && checkRoleUser(user, UserType.LECTURER))
        throw this.exceptionService.badRequestException({
          message: `Account can not has permission! `,
        });

      return await this.repository.update(Number(isCourseExist.id), {
        active: !isCourseExist.active,
        updatedBy: Number(user.id),
      });
    } catch (error) {
      this.logger.error('ACTIVE course exception: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({
        message: error.message || 'Bad Request',
      });
    }
  }

  async paymentSuccess(courseId: number, userId: number): Promise<Course> {
    try {
      const course = await this.repository.findOneRelations(courseId, { users: true });
      if (!course) {
        throw this.exceptionService.notFoundException({
          message: 'Course not found',
        });
      }
      const user = await this.userRepository.findOne({ id: userId });
      if (!user) {
        throw this.exceptionService.notFoundException({
          message: 'User not found',
        });
      }
      const newCourseUserList: User[] = [...course.users, user];
      course.users = newCourseUserList;
      return await this.repository.saveData(course);
    } catch (error) {
      this.logger.error('Payment success error: [' + JSON.stringify(error.message) + ']');
      this.exceptionService.badRequestException({ message: 'Payment failed' });
    }
  }

  async findCoursesByUserId(userId: number): Promise<Course[]> {
    try {
      this.logger.log('GET all course by user id api call]');
      const courseList = await this.repository.findCourseByIdUser(userId);
      return courseList;
    } catch (error) {
      this.logger.error('GET all course error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  async toCourseEntity(courseDto: any): Promise<Course> {
    const course = new Course();
    course.id = courseDto?.id ? Number(courseDto?.id) : course.id;
    course.slug = courseDto?.slug ?? course.slug;
    course.title = courseDto?.title ?? course.title;
    course.credit = courseDto?.credit ?? course.credit;
    course.email = courseDto?.email ?? course.email;
    course.summary = courseDto?.summary ?? course.summary;
    course.levelId = courseDto?.levelId ?? course.levelId;
    course.users = courseDto?.users ?? course.users;
    course.quizs = courseDto?.quizs ?? course.quizs;
    course.thumbnail = courseDto?.thumbnail ?? course.thumbnail;
    course.courseDocs = courseDto?.courseDocs ?? course.courseDocs;
    course.courseVideos = courseDto?.courseVideos ?? course.courseVideos;
    course.createdBy = courseDto?.createdBy ? Number(courseDto.createdBy) : course.createdBy;
    course.updatedBy = courseDto?.updatedBy ? Number(courseDto.updatedBy) : null;
    return course;
  }
}
