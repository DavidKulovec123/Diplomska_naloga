import { IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class CreateExerciseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sets: number;

  @IsNotEmpty()
  reps: number;

}
