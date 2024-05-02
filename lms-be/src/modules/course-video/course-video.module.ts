import { Module } from '@nestjs/common';
import { CourseVideoService } from './course-video.service';
import { CourseVideoController } from './course-video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDocsRepository } from '../course-docs/repository/course-docs.repository';
import { FileGeneralModule } from '../file-general/file-general.module';
import { ExceptionsModule } from '@/common/exceptions/exceptions.module';
import { XLoggerModule } from '@/common/Xlogger/Xlogger.module';
import { CourseModule } from '../course/course.module';
import { CourseVideoRepository } from './repository/course-video.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseDocsRepository]),
    FileGeneralModule,
    ExceptionsModule,
    XLoggerModule,
    CourseModule,
  ],
  controllers: [CourseVideoController],
  providers: [CourseVideoService, CourseVideoRepository],
})
export class CourseVideoModule {
  /**Empty */
}
