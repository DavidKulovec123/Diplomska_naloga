import { Module } from '@nestjs/common';
import {DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Diary } from "./diary.entity";
import {CommonModule} from "../common/common.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Diary]),
        CommonModule
    ],
    controllers: [DiaryController],
    providers: [DiaryService]
})
export class DiaryModule {}
