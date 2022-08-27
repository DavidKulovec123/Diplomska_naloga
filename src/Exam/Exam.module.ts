import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './Exam.entity';
import { CommonModule } from '../common/common.module';
import { ExamService } from './Exam.service';
import { ExamController } from './Exam.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), CommonModule],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
