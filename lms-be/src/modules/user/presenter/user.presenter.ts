import { User } from '../entities/user.entity';
import { RolePresenter } from './role.presenter';
import { Exclude } from 'class-transformer';

export class UserPresenter {
  id: string;
  active: boolean;
  firstName: string;
  lastName: string;
  isSuperUser: boolean;
  email: string;
  lastLogin: boolean;
  isStaff: boolean;
  isActive: boolean;
  isStudent: boolean;
  isLecturer: boolean;
  phone: string;
  address: string;
  picture: string;
  dateJoined: string;
  roles: RolePresenter[];
  @Exclude()
  password: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
