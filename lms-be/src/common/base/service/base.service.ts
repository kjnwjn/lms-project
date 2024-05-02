import { BaseEntity } from 'typeorm';
import { BaseRepository } from '../repository/base.repository';
import { IBaseService } from './i.base.service';

export class BaseService<T extends BaseEntity, R extends BaseRepository<T>>
  // eslint-disable-next-line prettier/prettier
  implements IBaseService<T> {
  constructor(protected readonly repository: R) {
    /**Empty */
  }

  // async find(): Promise<T[]> {
  //   return await this.repository.find();
  // }
}
