import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateExamDto } from './CreateExamDto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { ExamService } from './Exam.service';
import { UpdateTaskDto } from './UpdateTaskDto';

@UseGuards(AuthGuard)
@Controller('exams')
export class ExamController {
  constructor(
    private taskService: ExamService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getAll(@Req() request: Request) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.taskService.getAll(data);
  }

  @Get('/class/:id')
  async getAllinClass(@Req() request: Request, @Param('id') id: number) {
    const token = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(token);
    return await this.taskService.getAllData(user, id);
  }
  @Get(':date')
  async getAllonClick(@Req() request: Request, @Param('date') date: Date) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.taskService.getAllonClick(data, date);
  }

  @Post()
  async create(@Body() data: CreateExamDto, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);

    return this.taskService.create({
      title: data.title,
      content: data.content,
      date: data.date,
      location: data.location,
      Room: data.Room,
      Seat: data.Seat,
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
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    const task = await this.getOne(id);
    //preverim, če je lastnik
    if (task.user.id != user.id) {
      throw new UnauthorizedException('Nisi lastnik!');
    }

    return this.taskService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateTaskDto,
    @Req() request: Request,
  ) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    // console.log(user.id);
    const task = await this.getOne(id);
    //preverim, če je lastnik
    if (task.user.id != user.id) {
      throw new UnauthorizedException('Nisi lastnik!');
    }

    return this.taskService.update(id, data);
  }
}
