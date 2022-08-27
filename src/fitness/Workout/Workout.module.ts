import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './Workout.entity';
import { CommonModule } from '../../common/common.module';
import { WorkoutService } from './Workout.service';
import { WorkoutController } from './Workout.controller';
import { Exercise } from '../exercise/Exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Exercise]), CommonModule],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
