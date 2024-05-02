import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@Entity()
export abstract class GenericEntity extends BaseEntity {
  @Column({
    name: 'created_by',
    default: null,
    nullable: true,
  })
  createdBy: number;

  @Column({
    name: 'updated_by',
    default: null,
    nullable: true,
  })
  updatedBy: number;

  @Column({
    name: 'created_at',
    default: new Date().toISOString(),
    nullable: true,
  })
  createdAt: string;

  @Column({
    name: 'updated_at',
    default: null,
    nullable: true,
  })
  updatedAt: string;

  @Column({
    name: 'is_deleted',
    default: false,
    nullable: true,
  })
  isDeleted: boolean;

  @Column({
    name: 'active',
    default: true,
  })
  active: boolean;

  @BeforeUpdate()
  updated() {
    this.updatedAt = new Date().toISOString();
  }

  @BeforeInsert()
  created() {
    this.createdAt = new Date().toISOString();
  }
}
