import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
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
import { CreateWorkoutDto } from './CreateWorkoutDto';
import { Request } from 'express';
import { WorkoutService } from './Workout.service';
import { UpdateWorkoutDto } from './UpdateWorkoutDto';

@UseGuards(AuthGuard)
@Controller('Workouts')
export class WorkoutController {
  constructor(
    private WorkoutService: WorkoutService,
    private jwtService: JwtService,
  ) {}

  @Get()
  getAll() {
    return this.WorkoutService.getAll();
  }

  @Post()
  async create(@Body() data: CreateWorkoutDto, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    console.log(data);
    const exercises = [];

    const objekt = await this.WorkoutService.findOneExercise(data.exercise_id);

    exercises.push(objekt);

    return this.WorkoutService.create({
      workout_name: data.workout_name,
      user: { id: user.id },
      exercise: exercises,
    });
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.WorkoutService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.WorkoutService.delete(id);
  }
}
