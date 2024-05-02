import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

export class RolePresenter extends PartialType(Role) {
  id: number;
  name: string;
  users: User[];
}
