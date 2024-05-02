import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { FileGeneralController } from './file-general.controller';
import { FileGeneralService } from './file-general.service';
import { FileGeneralRepository } from './repository/file-general.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileGeneralRepository]), XLoggerModule],
  controllers: [FileGeneralController],
  providers: [FileGeneralService, FileGeneralRepository],
  exports: [TypeOrmModule, FileGeneralService],
})
export class FileGeneralModule {
  /**Empty */
}
