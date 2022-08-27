import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWorkTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  date: Date;

  @IsOptional()
  @IsString()
  location: string;
}
