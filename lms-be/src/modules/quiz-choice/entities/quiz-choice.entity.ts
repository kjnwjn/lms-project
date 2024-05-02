import { GenericEntity } from 'src/common/base/entity/base.entity';
import { QuizQuestion } from 'src/modules/quiz-question/entities/quiz-question.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_choice')
export class QuizChoice extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'choice' })
  choice: string;

  @Column({ default: false, name: 'correct' })
  correct: boolean;

  @ManyToOne(() => QuizQuestion, (quizQuestion) => quizQuestion, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  questionId: number;

  //   @ManyToMany(() => User, (user) => user.courses, {
  //     onDelete: 'CASCADE',
  //     onUpdate: 'CASCADE',
  //   })
  //   @JoinTable({
  //     name: 'users_course',
  //     joinColumn: {
  //       name: 'course_id',
  //       referencedColumnName: 'id',
  //     },
  //     inverseJoinColumn: {
  //       name: 'user_id',
  //       referencedColumnName: 'id',
  //     },
  //   })
  //   users: User[];
}
