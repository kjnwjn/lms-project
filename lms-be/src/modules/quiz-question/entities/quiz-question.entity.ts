import { GenericEntity } from 'src/common/base/entity/base.entity';
import { QuizChoice } from 'src/modules/quiz-choice/entities/quiz-choice.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quiz_question')
export class QuizQuestion extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'content', length: 1000 })
  content: string;

  @Column({ name: 'explanation', nullable: true, length: 1000 })
  explanation: string;

  @Column({ name: 'multiple_choice', nullable: true, default: false })
  multipleChoice: boolean;

  @Column({ name: 'image', nullable: true, length: 1000 })
  image: string;

  @ManyToOne(() => Quiz, (quiz) => quiz, { nullable: false })
  @JoinColumn({ name: 'quiz_id', referencedColumnName: 'id' })
  quizId: number;

  @OneToMany(() => QuizChoice, (quiz_choice) => quiz_choice.questionId, { cascade: true })
  choices: QuizChoice[];
}
