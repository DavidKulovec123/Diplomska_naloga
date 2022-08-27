import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Workout } from '../Workout/Workout.entity';
import { User } from '../../user/user.entity';

@Entity('Exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sets: string;

  @Column()
  reps: string;

  @ManyToOne(() => User, (user) => user.exercise, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  //@ManyToOne(() => Muscle, (muscle) => muscle.exercise, { eager: true })
  //@JoinColumn({ name: 'muscle_id' })
  //muscle: Muscle;

  //@ManyToMany(() => Muscle)
  //@JoinTable()
  //categories: Muscle[];

  @ManyToOne(() => Workout, (workout) => workout.exercise)
  workout: Workout;

  //@ManyToOne(() => Session, (session) => session.exercise, { eager: true })
  //@JoinColumn({ name: 'service_id' })
  //session: Session;
}
