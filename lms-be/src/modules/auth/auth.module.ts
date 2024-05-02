import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { UserRepository } from '../user/repository/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { XLoggerModule } from 'src/common/Xlogger/Xlogger.module';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    XLoggerModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN'),
        signOptions: {
          expiresIn: '1d',
        },
        global: true,
      }),
      global: true,

      inject: [ConfigService],
      // global: true,
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UserRepository, JwtStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {
  /**Empty */
}
