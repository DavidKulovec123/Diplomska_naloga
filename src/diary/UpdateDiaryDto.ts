import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDiaryDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
