import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateClassDto {
    @IsString()
    @IsOptional()
    title?:string;

    @IsOptional()
    @IsString()
    content?:string;


}