import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from 'src/modules/user/entities/role.entity';
import { UserType } from '../enums/userType.enum';
import { checkRoleUser } from '../helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    /**Empty */
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException();
    try {
      const roles = this.reflector.getAllAndMerge('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('TOKEN'),
      });
      if (!payload.active && checkRoleUser(payload, UserType.LECTURER))
        throw new ForbiddenException({ message: 'User is not active' });
      return payload.roles.some((role: Role) => roles.includes(role.role_name));
    } catch (error) {
      console.log('🚀 ~ AuthenGuard ~ canActivate ~ error:', error);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
