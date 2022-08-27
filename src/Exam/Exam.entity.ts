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

@Entity('Exams')
export class Exam {
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

  @Column()
  Room: string;

  @Column()
  Seat: string;

  @ManyToOne(() => User, (user) => user.exams, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Subject, (subject) => subject.exams, { eager: true })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
}
