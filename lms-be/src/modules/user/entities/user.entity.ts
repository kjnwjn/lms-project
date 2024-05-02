import * as bcrypt from 'bcrypt';
import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Role } from './role.entity';
import { QuizSitting } from '@/modules/quiz-sitting/entities/quiz-sitting.entity';
import { Blog } from '@/modules/blog/entities/blog.entity';
import { BlogComment } from '@/modules/blog-comment/entities/blog-comment.entity';

@Entity('users')
@Unique(['email'])
export class User extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'first_name' })
  firstName: string;

  @Column({ length: 500, name: 'last_name' })
  lastName: string;

  @Column({ name: 'is_super_user', default: false })
  isSuperUser: boolean;

  @Column({ length: 500, nullable: false })
  email: string;

  @Column({ length: 500, name: 'password' })
  password: string;

  @Column({
    name: 'last_login',
    default: new Date().toISOString(),
    nullable: true,
  })
  lastLogin: string;

  @Column({ length: 12, name: 'phone', nullable: true })
  phone: string;

  @Column({ length: 500, name: 'address', nullable: true })
  address: string;

  @Column({ length: 500, name: 'picture', nullable: true })
  picture: string;

  @Column({
    name: 'date_joined',
    default: new Date().toISOString(),
    nullable: true,
  })
  dateJoined: string;

  @ManyToMany(() => Course, (course) => course.users)
  courses: Course[];

  @OneToMany(() => BlogComment, (blog_comment) => blog_comment.email)
  blogComments: BlogComment[];

  @OneToMany(() => QuizSitting, (quiz_sitting) => quiz_sitting.userId)
  quizSittings: QuizSitting[];

  @OneToMany(() => Blog, (blog) => blog.userId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  blogs: Blog[];

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'users_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    this.active = false;
  }
}
