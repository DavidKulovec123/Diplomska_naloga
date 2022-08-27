import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './Workout.entity';
import { Repository } from 'typeorm';
import { Exercise } from '../exercise/Exercise.entity';

export interface WorkoutResults {
  id: number;
  workout_name: string;
  exercise: {
    name: string;
    sets: string;
    reps: string;
  };
  created_at: Date;
}

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseEntityRepository: Repository<Exercise>,
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
  ) {}

  async getAll(): Promise<any[]> {
    const workouts = await this.workoutRepository.find({
      relations: ['exercise'],
    });
    const results: WorkoutResults[] = [];
    for (let i = 0; i < workouts.length; i++) {
      let e: Exercise | null = null;
      if (workouts[i].exercise.length > 0) {
        e = await this.findOneExercise(workouts[i].exercise[0].id.toString());
      }
      results.push({
        id: workouts[i].id,
        workout_name: workouts[i].workout_name,
        exercise: e
          ? {
              name: e.name,
              sets: e.sets,
              reps: e.reps,
            }
          : null,
        created_at: workouts[i].created_at,
      });
    }
    return results;
  }
  create(data): Promise<Workout> {
    return this.workoutRepository.save(data);
  }

  findOne(id: number): Promise<Workout> {
    return this.workoutRepository.findOne({ where: { id } });
  }
  findOneExercise(id: string): Promise<Exercise> {
    return this.exerciseEntityRepository.findOne({
      where: { id: parseInt(id) },
    });
  }
  async update(id: number, data): Promise<Workout> {
    await this.workoutRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    const wokrout = await this.workoutRepository.findOne({ id: id });
    const exercise = await this.exerciseEntityRepository.findOne({
      workout: wokrout,
    });
    if (!exercise) {
      throw new BadRequestException('Ni najdlo');
    }
    exercise.workout = null;
    await this.exerciseEntityRepository.save(exercise);
    return this.workoutRepository.delete({ id: id });
  }
}
