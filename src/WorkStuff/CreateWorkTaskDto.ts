import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  date: Date;

  @IsString()
  location: string;

}
