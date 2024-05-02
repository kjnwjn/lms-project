import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { FileGeneralModule } from '../file-general/file-general.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), FileGeneralModule, XLoggerModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [TypeOrmModule, CategoryService],
})
export class CategoryModule {
  /**Empty */
}
