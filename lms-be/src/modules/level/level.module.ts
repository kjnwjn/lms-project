import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { LevelRepository } from './repository/level.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';

@Module({
  imports: [TypeOrmModule.forFeature([LevelRepository]), XLoggerModule, ExceptionsModule],
  controllers: [LevelController],
  providers: [LevelService, LevelRepository],
  exports: [LevelRepository],
})
export class LevelModule {
  /**Empty */
}
