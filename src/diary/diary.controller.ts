import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put, Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateDiaryDto } from './CreateDiaryDto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { DiaryService } from './diary.service';
import { UpdateDiaryDto } from './UpdateDiaryDto';
import { diskStorage } from 'multer';

@UseGuards(AuthGuard)
@Controller('diary')
export class DiaryController {
  constructor(
    private diaryService: DiaryService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getAll(@Query() dataFIlters: string, @Req() request: Request) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.diaryService.getAll(data, dataFIlters);
  }

  @Post()
  async create(@Body() data: CreateDiaryDto, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);

    return this.diaryService.create({
      title: data.title,
      content: data.content,
      user: { id: user.id },
    });
  }
  /**
        @Post('upload')
        @UseInterceptors(FileInterceptor('file',{
            storage: diskStorage({
                destination: './uploads',
                filename(_,file,callback) {
                    return callback(null,file.originalname);
                }
            })
        }))
        uploadFile(@UploadedFile() file: Express.Multer.file) {
            console.log(file);
        }
    **/

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.diaryService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);

    const diary = await this.getOne(id);
    //preverim, če je lastnik
    if (diary.user.id != user.id) {
      throw new UnauthorizedException('Nisi lastnik!');
    }

    return this.diaryService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateDiaryDto,
    @Req() request: Request,
  ) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    // console.log(user.id);
    const diary = await this.getOne(id);
    //preverim, če je lastnik
    if (diary.user.id != user.id) {
      throw new UnauthorizedException('Nisi lastnik!');
    }

    return this.diaryService.update(id, data);
  }
}
