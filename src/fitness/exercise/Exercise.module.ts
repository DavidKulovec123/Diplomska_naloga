import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './Exercise.entity';
import { CommonModule } from '../../common/common.module';
import { ExerciseService } from './Exercise.service';
import { ExerciseController } from './Exercise.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), CommonModule],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
