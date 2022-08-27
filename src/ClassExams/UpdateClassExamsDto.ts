import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClassExamsDto {
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

    @IsOptional()
    @IsString()
    Room: string;

    @IsOptional()
    @IsString()
    Seat: string;
}
