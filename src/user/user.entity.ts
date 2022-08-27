import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diary } from '../diary/diary.entity';
import { Exam } from '../Exam/Exam.entity';
import { Session } from '../fitness/workout_session/Session.entity';
import { Razred } from '../Class/class.entity';
import { Exercise } from '../fitness/exercise/Exercise.entity';
import { Workout } from '../fitness/Workout/Workout.entity';
import { WorkTask } from '../WorkStuff/WorkTask.entity';

@Entity('users')
export class User extends BaseEntity {
  // dodatne funkcije
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Razred, (razred) => razred.user, { eager: true })
  @JoinColumn({ name: 'razred_id' })
  razred: Razred;

  @Column({ nullable: true, default: null })
  class_status: string;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercise: Exercise[];

  @OneToMany(() => Workout, (workout) => workout.user)
  workout: Workout[];

  @OneToMany(() => Diary, (Diary) => Diary.user)
  Diary: Diary[];

  @OneToMany(() => Exam, (exam) => exam.user)
  exams: Exam[];

  @OneToMany(() => WorkTask, (workTask) => workTask.user)
  workTask: WorkTask[];
}
