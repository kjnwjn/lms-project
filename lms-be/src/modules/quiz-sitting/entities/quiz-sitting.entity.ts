import { Quiz } from '@/modules/quiz/entities/quiz.entity';
import { User } from '@/modules/user/entities/user.entity';
import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_sitting')
export class QuizSitting extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: 0, name: 'current_score', nullable: true })
  currentScore: number;

  @Column({ default: false, name: 'is_complete' })
  isComplete: boolean;

  @Column({ default: '', name: 'user_answers', nullable: true })
  userAnswers: string;

  @Column({ name: 'start_time', nullable: true })
  startTime: string;

  @Column({ name: 'end_time', nullable: true })
  endTime: string;

  @ManyToOne(() => Course, (course) => course, { nullable: false })
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  courseId: number;

  @ManyToOne(() => User, (user) => user, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: number;

  @ManyToOne(() => Quiz, (quiz) => quiz, { nullable: false })
  @JoinColumn({ name: 'quiz_id', referencedColumnName: 'id' })
  quizId: number;
}
