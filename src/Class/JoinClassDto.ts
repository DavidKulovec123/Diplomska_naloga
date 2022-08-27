import { IsNotEmpty, IsString } from 'class-validator';

export class JoinClassDto {
  @IsNotEmpty()
  @IsString()
  class_code: string;
}
