import { Module } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentController } from './blog-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCommentRepository } from './repository/blog-comment.repository';
import { ExceptionsModule } from '@/common/exceptions/exceptions.module';
import { XLoggerModule } from '@/common/Xlogger/Xlogger.module';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogCommentRepository]),
    ExceptionsModule,
    XLoggerModule,
    BlogModule,
  ],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository],
  exports: [TypeOrmModule, BlogCommentService],
})
export class BlogCommentModule {
  /**Empty */
}
