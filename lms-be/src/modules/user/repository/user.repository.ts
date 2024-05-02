import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/repository/base.repository';
import { EntityTarget } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserType } from '@/common/enums/userType.enum';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  getEntityType(): EntityTarget<User> {
    return User;
  }

  async findAllStudents() {
    return await this.repository.find({
      where: { roles: { role_name: UserType.STUDENT.toString() } },
      relations: { roles: true },
    });
  }

  async findAllLecturers() {
    return await this.repository.find({
      where: { roles: { role_name: UserType.LECTURER.toString() } },
      relations: { roles: true },
    });
  }

  async findAllAdmins() {
    return await this.repository.find({
      where: { roles: { role_name: UserType.ADMIN.toString() } },
      relations: { roles: true },
    });
  }

  async findOne(conditions: object) {
    return await this.repository.findOne({
      where: { ...conditions },
      relations: { roles: true },
    });
  }

  async updateOne(conditions: object, updates: object) {
    await this.repository.update({ ...conditions }, { ...updates });
    return await this.findOne(conditions);
  }

  async findAll(conditions: object) {
    return await this.repository.find({
      where: { ...conditions },
      relations: { roles: true },
    });
  }

  async findOneUserById(id: any) {
    return await this.repository.findOne({
      where: { id },
      relations: { roles: true },
    });
  }

  async findOneUserByEmail(email: string) {
    return await this.repository.findOne({
      where: { email },
      relations: { roles: true },
    });
  }
}
