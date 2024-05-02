import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { FileGeneral } from '../entities/file-general.entity';
@Injectable()
export class FileGeneralRepository extends BaseRepository<FileGeneral> {
  getEntityType(): EntityTarget<FileGeneral> {
    return FileGeneral;
  }
  async findAllProductHasImages() {
    return await this.repository.find();
  }
}
