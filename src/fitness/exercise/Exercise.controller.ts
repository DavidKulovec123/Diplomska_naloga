import {
  BadRequestException,
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

import { AuthGuard } from '../../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateExerciseDto } from './CreateExerciseDto';
import { Request } from 'express';
import { ExerciseService } from './Exercise.service';
import { UpdateExerciseDto } from './UpdateExerciseDto';

@UseGuards(AuthGuard)
@Controller('exercises')
export class ExerciseController {
  constructor(
    private ExerciseService: ExerciseService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getAll() {
    return this.ExerciseService.getAll();
  }

  @Post()
  async create(@Body() data: CreateExerciseDto, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    const newExercise = await this.ExerciseService.create({
      name: data.name,
      sets: data.sets,
      reps: data.reps,
      user: { id: user.id },
    });
    if (!newExercise) {
      throw new BadRequestException('ni moglo creirat');
    }
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
    return this.ExerciseService.findOne(id);
  }
}
