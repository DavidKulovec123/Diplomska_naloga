import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './Session.entity';
import { CommonModule } from '../../common/common.module';
import { SessionService } from './Session.service';
import { SessionController } from './Session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), CommonModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
