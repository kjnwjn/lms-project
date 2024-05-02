import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export class UserInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    /**Empty */
  }
  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const token = req?.headers?.authorization?.split('Bearer ')[1];
    try {
      const user = this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('TOKEN'),
      });
      req.user = user;
      return next.handle();
    } finally {
      return next.handle();
    }
  }
}
