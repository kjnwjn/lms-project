import { Module } from '@nestjs/common';
import { XloggerService } from './Xlogger.service';

@Module({
  providers: [XloggerService],
  exports: [XloggerService],
})
export class XLoggerModule {
  /**Empty */
}
