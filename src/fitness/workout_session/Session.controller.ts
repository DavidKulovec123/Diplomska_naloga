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

import { AuthGuard } from '../../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateSessionDto } from './CreateSessionDto';
import { Request } from 'express';
import { SessionService } from './Session.service';
import { UpdateSessionDto } from './UpdateSessionDto';

@UseGuards(AuthGuard)
@Controller('session')
export class SessionController {
  constructor(
    private SessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getAll(@Req() request: Request) {
    const token = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(token);
    return await this.SessionService.getAll(data);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.SessionService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateSessionDto, @Req() request: Request) {
    const jwt = request.cookies['jwt'];
    const user = await this.jwtService.verifyAsync(jwt);

    return this.SessionService.create({
      session_name: data.session_name,
      user: { id: user.id },
    });
  }















}


