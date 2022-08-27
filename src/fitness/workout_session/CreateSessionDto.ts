import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  session_name: string;

}
