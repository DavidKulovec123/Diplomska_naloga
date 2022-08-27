import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Subject } from '../Subject/subject.entity';
import { User } from '../user/user.entity';

@Entity('WorkTasks')
export class WorkTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  location: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.workTask, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
