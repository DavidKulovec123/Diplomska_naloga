import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsNotEmpty()
  workout_name: string;

  @IsNotEmpty()
  exercise_id: string;

}
