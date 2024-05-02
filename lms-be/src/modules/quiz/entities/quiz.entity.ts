import { QuizSitting } from '@/modules/quiz-sitting/entities/quiz-sitting.entity';
import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { QuizQuestion } from 'src/modules/quiz-question/entities/quiz-question.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('quiz_quiz')
export class Quiz extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'title' })
  title: string;

  @Column({ name: 'question_to_pass' })
  questionToPass: number;

  @Column({ name: 'min_question', default: 1 })
  minQuestion: number;

  @Column({ name: 'description', nullable: true, default: '', length: 5000 })
  description: string;

  @Column({ name: 'answers_at_end', nullable: true, default: false })
  answersAtEnd: boolean;

  @Column({ name: 'random_order', nullable: true, default: false })
  randomOrder: boolean;

  @Column({ name: 'single_attempt', nullable: true, default: false })
  singleAttempt: boolean;

  @Column({ name: 'deadline', nullable: true, default: new Date().toISOString() })
  deadline: string;

  @Column({ name: 'course_id' })
  @ManyToOne(() => Course, (course) => course)
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  courseId: number;

  @OneToMany(() => QuizQuestion, (quiz_question) => quiz_question.quizId)
  questionList: QuizQuestion[];

  @OneToMany(() => QuizSitting, (quiz_sitting) => quiz_sitting.quizId)
  quizSittings: QuizQuestion[];

  // @OneToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.id, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinTable({
  //   name: 'question_list',
  //   joinColumn: {
  //     name: 'quiz_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'question_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // questionList: QuizQuestion[];

  @BeforeInsert()
  created() {
    this.active = false;
  }
}
