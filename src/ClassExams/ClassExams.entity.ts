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

import { Razred } from '../Class/class.entity';

@Entity('ClassExams')
export class ClassExam {
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

  @ManyToOne(() => Razred, (razred) => razred.classExams, { eager: true })
  @JoinColumn({ name: 'razred_id' })
  razred: Razred;
}
