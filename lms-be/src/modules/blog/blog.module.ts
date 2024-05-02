import { Module } from '@nestjs/common';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { CategoryModule } from '../category/category.module';
import { FileGeneralModule } from '../file-general/file-general.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './repository/blog.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogRepository]),
    FileGeneralModule,
    CategoryModule,
    XLoggerModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: [BlogService],
})
export class BlogModule {
  /**Empty */
}
