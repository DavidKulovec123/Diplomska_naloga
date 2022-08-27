import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkTask } from './WorkTask.entity';
import { Repository } from 'typeorm';
import { Diary } from '../diary/diary.entity';
import { User } from '../user/user.entity';

@Injectable()
export class WorkTaskService {
  constructor(
    @InjectRepository(WorkTask)
    private readonly WorkTaskEntityRepository: Repository<WorkTask>,
  ) {}

  getAll(data): Promise<WorkTask[]> {
    return this.WorkTaskEntityRepository.find({
      where: { user: data.id },
    });
  }

  async getAllData(data, ids): Promise<WorkTask[]> {
    const currentUser = await User.findOne(data.id);
    if (currentUser.razred.id == ids) {
      console.log(currentUser);
      return this.WorkTaskEntityRepository.find({ where: { user: data.id } });
    }
  }

  async getAllonClick(data, date): Promise<WorkTask[]> {
    const workTask = await this.WorkTaskEntityRepository.find({
      where: { user: data.id },
    });
    const currentExams: WorkTask[] = [];
    for (let i = 0; i < workTask.length; i++) {
      let day: string = workTask[i].date.getDate().toString();
      let month = (workTask[i].date.getMonth() + 1).toString();
      if (day.length === 1) day = `0${day}`;
      if (month.length === 1) month = `0${month}`;
      const formattedDate = `${day}${month}${workTask[i].date.getFullYear()}`;
      if (date === formattedDate) {
        currentExams.push(workTask[i]);
      }
    }
    console.log(currentExams);
    return currentExams;
  }

  create(data): Promise<WorkTask> {
    return this.WorkTaskEntityRepository.save(data);
  }

  findOne(id: number): Promise<WorkTask> {
    return this.WorkTaskEntityRepository.findOne({ where: { id } });
  }

  async update(id: number, data): Promise<WorkTask> {
    await this.WorkTaskEntityRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    console.log("DO SEM JE SE PRISLO");
    return this.WorkTaskEntityRepository.delete({ id: id });
  }
}
