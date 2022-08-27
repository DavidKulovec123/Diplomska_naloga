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
import { JoinClassDto } from './JoinClassDto';
import { Request } from 'express';
import { ClassService } from './class.service';

@UseGuards(AuthGuard)
@Controller('classes')
export class ClassController {
  constructor(
    private classService: ClassService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getAll(@Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    return await this.classService.getAll(user);
  }
  @Post(':id')
  async getOne(
    @Param('id') id: number,
    @Req() request: Request,
    @Body() Code: JoinClassDto,
  ) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    return this.classService.UserGetsAClass(id, Code, user);
  }
  @Get('/user')
  async getAllUsers(@Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);
    return await this.classService.getAllUsers(user);
  }
}
