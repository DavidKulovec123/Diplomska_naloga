import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/user.entity';
import { Exercise } from '../exercise/Exercise.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workout_name: string;

  @OneToMany(() => Exercise, (exercise) => exercise.workout)
  exercise: Exercise[];

  @ManyToOne(() => User, (user) => user.workout, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
