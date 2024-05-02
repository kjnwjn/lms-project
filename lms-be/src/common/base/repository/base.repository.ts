import { InjectDataSource } from '@nestjs/typeorm';
import { BaseEntity, DataSource, DeleteResult, EntityTarget, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export abstract class BaseRepository<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(@InjectDataSource() protected dataSource: DataSource) {
    this.repository = dataSource.getRepository(this.getEntityType());
  }

  async find(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(fieldName: object): Promise<T> {
    return await this.repository.findOne({ where: fieldName });
  }

  async findOneBy(fieldName: any): Promise<T> {
    return await this.repository.findOneBy(fieldName);
  }

  async save(data: any): Promise<T> {
    return await this.repository.save(data);
  }

  async saveData(entity?: T): Promise<T> {
    return this.repository.save(entity);
  }

  async update(id: any, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findOneBy(id);
  }

  async delete(id: EntityId): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async softDelete(id: EntityId): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }

  abstract getEntityType(): EntityTarget<T>;
}
