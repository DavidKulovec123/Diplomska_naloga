import { IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
