import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface UserInfo {
  id: number;
  email: string;
  roles: object[];
  active: boolean;
  is_supper_user: boolean;
  picture: string;
  iat: number;
  exp: number;
}
export const User = createParamDecorator((_data, context: ExecutionContext): UserInfo => {
  const req = context.switchToHttp().getRequest();
  return req.user;
});
