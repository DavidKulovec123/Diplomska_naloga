import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { ClassExam } from '../ClassExams/ClassExams.entity';

@Entity('razred')
export class Razred {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_name: string;

  @Column()
  class_code: string;

  @OneToMany(() => User, (user) => user.razred)
  user: User[];

  @OneToMany(() => ClassExam, (classExams) => classExams.razred)
  classExams: ClassExam[];
}
