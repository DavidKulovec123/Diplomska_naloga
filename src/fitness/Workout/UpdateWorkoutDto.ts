import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkoutDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
