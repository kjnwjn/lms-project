import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { FileGeneralModule } from '../file-general/file-general.module';
import { RoleRepository } from './repository/role.repository';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    XLoggerModule,
    ExceptionsModule,
    FileGeneralModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleRepository, MailService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {
  /**Empty */
}
