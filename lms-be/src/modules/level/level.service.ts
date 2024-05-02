import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { BaseService } from 'src/common/base/service/base.service';
import { Level } from './entities/level.entity';
import { LevelRepository } from './repository/level.repository';
import { ExceptionsService } from '@/common/exceptions/exceptions.service';
import { XloggerService } from '@/common/Xlogger/Xlogger.service';

@Injectable()
export class LevelService extends BaseService<Level, LevelRepository> {
  constructor(
    protected readonly repository: LevelRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly logger: XloggerService,
  ) {
    super(repository);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_createLevelDto: CreateLevelDto) {
    return 'This action adds a new level';
  }

  async findAll() {
    try {
      this.logger.log('GET all level api call');
      const levelList = await this.repository.find();
      return levelList;
    } catch (error) {
      this.logger.error('GET all level error: [' + JSON.stringify(error.message) + ']');
      throw this.exceptionService.internalServerErrorException({
        message: 'Bad Request',
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, _updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
