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
import { CreateWorkTaskDto } from './CreateWorkTaskDto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { WorkTaskService } from './WorkTask.service';
import { UpdateWorkTaskDto } from './UpdateWorkTaskDto';

@UseGuards(AuthGuard)
@Controller('WorkTasks')
export class WorkTaskController {
  constructor(
    private workTaskService: WorkTaskService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getAll(@Req() request: Request) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.workTaskService.getAll(data);
  }

  @Get('/class/:id')
  async getAllinClass(@Req() request: Request, @Param('id') id: number) {
    const token = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(token);
    return await this.workTaskService.getAllData(user, id);
  }
  @Get(':date')
  async getAllonClick(@Req() request: Request, @Param('date') date: Date) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.workTaskService.getAllonClick(data, date);
  }

  @Post()
  async create(@Body() data: CreateWorkTaskDto, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);

    return this.workTaskService.create({
      title: data.title,
      content: data.content,
      date: data.date,
      location: data.location,
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
    return this.workTaskService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    const workTask = await this.getOne(id);
    console.log('safsafas');
    console.log(workTask);
    if (workTask.user.id != user.id) {
      throw new UnauthorizedException('Nisi lastnik!');
    }
    console.log('DO SEM JE SE PRISLOooooooooooooooooooooooooooooo');
    return this.workTaskService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateWorkTaskDto,
    @Req() request: Request,
  ) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);

    const workTask = await this.getOne(id);
    console.log(workTask);
    if (workTask.user.id != user.id) {
      throw new UnauthorizedException('Nisi lastnik!');
    }
    console.log('asfasfasf' + data);
    return this.workTaskService.update(id, data);
  }
}
