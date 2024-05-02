import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super({ property: 'user' });
  }

  handleRequest(err: ErrorCallback, user: any, _info: any, context: any) {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    if (err || !user) {
      if (!email) {
        throw new HttpException({ message: 'Email is required' }, HttpStatus.OK);
      } else if (!password) {
        throw new HttpException({ message: 'Password is required' }, HttpStatus.OK);
      } else {
        throw err || new UnauthorizedException();
      }
    }
    return user;
  }
}
