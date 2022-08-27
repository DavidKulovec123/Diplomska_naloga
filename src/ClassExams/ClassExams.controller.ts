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
import { CreateClassExamsDto } from './CreateClassExamsDto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { ClassExamsService } from './ClassExams.service';
import { UpdateClassExamsDto } from './UpdateClassExamsDto';
import { User } from '../user/user.entity';
import { ClassExam } from './ClassExams.entity';
import { UpdateTaskDto } from '../Exam/UpdateTaskDto';

@UseGuards(AuthGuard)
@Controller('classExams')
export class ClassExamsController {
  constructor(
    private taskService: ClassExamsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getAll(@Req() request: Request) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.taskService.getAllData(data);
  }

  @Get(':id')
  async getAllClassExams(@Req() request: Request, @Param('id') id: number) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.taskService.getAllClassExams(data, id);
  }
  @Get(':id')
  getOnee(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }
  @Get('getClass:id/:date')
  async getAllonClick(
    @Req() request: Request,
    @Param('date') date: Date,
    @Param('id') id: number,
  ) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.taskService.getAllonClick(data, date, id);
  }
  //dela

  @Post(':id')
  async create(@Param('id') id: number, @Body() data: CreateClassExamsDto) {
    return this.taskService.create({
      title: data.title,
      content: data.content,
      date: data.date,
      location: data.location,
      Room: data.Room,
      Seat: data.Seat,
      razred: id,
    });
  }

  @Get('/getall/:id')
  async getUsersInClass(@Param('id') id: number): Promise<ClassExam[]> {
    return this.taskService.getUsersInClass(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateClassExamsDto,
  ) {

    return this.taskService.update(id, data);
  }

  @Patch('leave/:id')
  async Leave(@Req() request: Request, @Param('id') id: number) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    const uporabnik: User = await User.findOne(user.id);
    console.log(id);
    console.log(uporabnik.razred.id);
    if (uporabnik.razred.id == id) {
      console.log('safasfasffasafas');
      uporabnik.razred = null;
      return User.save(uporabnik);
    }
  }
}
