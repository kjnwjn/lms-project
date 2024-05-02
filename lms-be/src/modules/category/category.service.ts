import { Injectable } from '@nestjs/common';
import { XloggerService } from 'src/common/Xlogger/Xlogger.service';
import { BaseService } from 'src/common/base/service/base.service';
import { ExceptionsService } from 'src/common/exceptions/exceptions.service';
import { FileGeneralService } from '../file-general/file-general.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { UserInfo } from '@/common/decorators/user.decorator';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryRepository> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly fileGeneralService: FileGeneralService,
    private readonly logger: XloggerService,
  ) {
    super(categoryRepository);
  }

  async create(body: CreateCategoryDto, user: UserInfo) {
    try {
      this.logger.log('CREATE CATEGORY information: [' + JSON.stringify(body) + ']');
      body.createdBy = Number(user.id);
      const newCategory: Category = await this.repository.saveData(this.toCategoryEntity(body));
      return newCategory;
    } catch (error) {
      this.logger.error('CREATE CATEGORY error: [' + JSON.stringify(error) + ']');
      this.exceptionService.badRequestException({ message: 'Bad request' });
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      this.logger.log('FIND ALL CATEGORY information: []');
      const data = await this.categoryRepository.findAllRelations(['blogs']);
      if (data.length < 1)
        throw this.exceptionService.notFoundException({
          message: 'List category empty',
        });
      return data;
    } catch (error) {
      this.logger.log('FIND ALL CATEGORY error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.badRequestException({
        message: 'Bad request',
      });
    }
  }

  async findOne(id: number) {
    try {
      this.logger.log('FIND ONE CATEGORY information: [' + JSON.stringify(id) + ']');
      const categoryExist: Category = await this.categoryRepository.findOneById(id);
      if (!categoryExist)
        throw this.exceptionService.notFoundException({
          message: 'Category not found.',
        });
      return categoryExist;
    } catch (error) {
      this.logger.error('FIND ONE CATEGORY error: [' + JSON.stringify(error) + ']');
      this.exceptionService.badRequestException({ message: 'Bad request' });
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, user: UserInfo) {
    try {
      this.logger.log(
        'UPDATE CATEGORY information: [' + JSON.stringify(updateCategoryDto) + id + ']',
      );

      const cateExist = await this.categoryRepository.findOne({ id });

      if (!cateExist)
        throw this.exceptionService.badRequestException({
          message: `Category ${id} not found`,
        });
      await this.categoryRepository.update(id, {
        name: updateCategoryDto.name,
        updatedBy: user.id,
      });
      return `Update category ${id} successfully`;
    } catch (error) {
      this.logger.error('UPDATE CATEGORY error: [' + JSON.stringify(error) + ']');
      this.exceptionService.badRequestException({ message: 'Bad request' });
    }
  }

  async remove(id: number) {
    try {
      this.logger.log('REMOVE CATEGORY information: [' + JSON.stringify(id) + ']');

      const categoryExist: Category = await this.categoryRepository.findOne({
        id,
      });
      if (!categoryExist)
        throw this.exceptionService.notFoundException({
          message: `Category ${id} not found`,
        });
      const isDeleted = await this.repository.delete(id);
      if (!isDeleted.affected)
        throw this.exceptionService.internalServerErrorException({
          message: 'Internal error service',
        });
      return `Delete category ${id} successfully`;
    } catch (error) {
      this.logger.error('REMOVE CATEGORY error: [' + JSON.stringify(error) + ']');
      this.exceptionService.badRequestException({ message: 'Bad request' });
    }
  }

  toCategoryEntity(categoryDto: CreateCategoryDto): Category {
    const category = new Category();
    category.name = categoryDto.name;
    category.createdBy = categoryDto.createdBy ?? null;
    category.updatedBy = categoryDto.updatedBy ?? null;
    return category;
  }
}
