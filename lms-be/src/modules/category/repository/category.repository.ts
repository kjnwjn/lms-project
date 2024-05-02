import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { Category } from '../entities/category.entity';
@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  getEntityType(): EntityTarget<Category> {
    return Category;
  }
  async findOneById(id: number) {
    const data = await this.repository.findOne({
      where: { id },
    });
    return data;
  }
  async findAllRelations(relations: string[]) {
    const data = await this.repository.find({ relations: relations });
    return data;
  }
}
