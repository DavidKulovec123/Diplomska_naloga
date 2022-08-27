import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassExam } from './ClassExams.entity';
import { CommonModule } from '../common/common.module';
import { ClassExamsService } from './ClassExams.service';
import { ClassExamsController } from './ClassExams.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassExam]), CommonModule],
  controllers: [ClassExamsController],
  providers: [ClassExamsService],
})
export class ClassExamsModule {}
