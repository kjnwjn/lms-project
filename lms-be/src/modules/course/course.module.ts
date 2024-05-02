import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileGeneralModule } from '../file-general/file-general.module';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { CourseRepository } from './repository/course.repository';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { LevelModule } from '../level/level.module';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseRepository]),
    XLoggerModule,
    ExceptionsModule,
    FileGeneralModule,
    LevelModule,
    UserModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, UserRepository],
  exports: [TypeOrmModule, CourseService],
})
export class CourseModule {
  /**Empty */
}
