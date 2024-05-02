import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { Level } from '../entities/level.entity';

export class LevelRepository extends BaseRepository<Level> {
  getEntityType(): EntityTarget<Level> {
    return Level;
  }
  async findOneRelations(id: number, relations: any) {
    return await this.repository.findOne({
      where: { id },
      relations: relations,
    });
  }
  async findAllLevels() {
    return await this.repository.find({ relations: ['courses'] });
  }
}
