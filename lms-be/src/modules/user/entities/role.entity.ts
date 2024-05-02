import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('role')
export class Role extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'role_name' })
  role_name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
