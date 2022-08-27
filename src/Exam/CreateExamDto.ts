import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamDto {
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

  @IsString()
  Room: string;

  @IsString()
  Seat: string;
}
