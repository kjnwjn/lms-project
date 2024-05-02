import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  getEntityType(): EntityTarget<Role> {
    return Role;
  }

  async findOneByName(role_name: string): Promise<Role> {
    return await this.repository.findOne({ where: { role_name } });
  }

  async getRolesByIdUser(id: number): Promise<Role[]> {
    return await this.repository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.users', 'user')
      .where('user.id = :id', { id })
      .getMany();
  }
}
