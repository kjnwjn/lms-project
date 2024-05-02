import { User } from '@/modules/user/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { UserInfo } from '../decorators/user.decorator';
import { UserType } from '../enums/userType.enum';
import { Role } from '@/modules/user/entities/role.entity';

export const generateToken = (data: any) => {
  return jwt.sign({ ...data }, process.env.TOKEN, {
    expiresIn: '10d',
  });
};
export const checkRoleUser = (user: User | UserInfo, roleCheck: UserType) => {
  return user?.roles.some((role: Role) => role?.role_name.includes(roleCheck));
};

// program to generate random strings
export const generateString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const getPublicFileUrl = (bucketName: string, fileName: string) => {
  return `https://${bucketName}.${process.env.B2_ENDPOINT_URL}/${fileName}`;
};
