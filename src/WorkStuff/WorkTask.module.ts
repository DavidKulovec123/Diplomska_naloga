import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkTask } from './WorkTask.entity';
import { CommonModule } from '../common/common.module';
import { WorkTaskService } from './WorkTask.service';
import { WorkTaskController } from './WorkTask.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkTask]), CommonModule],
  controllers: [WorkTaskController],
  providers: [WorkTaskService],
})
export class WorkTaskModule {}
