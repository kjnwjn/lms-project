import { Module } from '@nestjs/common';
import { CourseDocsService } from './course-docs.service';
import { CourseDocsController } from './course-docs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDocsRepository } from './repository/course-docs.repository';
import { FileGeneralModule } from '../file-general/file-general.module';
import { ExceptionsModule } from '@/common/exceptions/exceptions.module';
import { XLoggerModule } from '@/common/Xlogger/Xlogger.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseDocsRepository]),
    FileGeneralModule,
    ExceptionsModule,
    XLoggerModule,
    CourseModule,
  ],
  controllers: [CourseDocsController],
  providers: [CourseDocsService, CourseDocsRepository],
  exports: [TypeOrmModule],
})
export class CourseDocsModule {
  /**Empty */
}
