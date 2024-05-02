import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { XLoggerModule } from '@/common/Xlogger/Xlogger.module';
import { ExceptionsModule } from '@/common/exceptions/exceptions.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [XLoggerModule, ExceptionsModule, CourseModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
