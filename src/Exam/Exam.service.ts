import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './Exam.entity';
import { Repository } from 'typeorm';
import { Diary } from '../diary/diary.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly taskEntityRepository: Repository<Exam>,
  ) {}

  getAll(data): Promise<Exam[]> {
    return this.taskEntityRepository.find({
      where: { user: data.id },
    });
  }

  async getAllData(data, ids): Promise<Exam[]> {
    const currentUser = await User.findOne(data.id);
    if (currentUser.razred.id == ids) {
      console.log(currentUser);
      return this.taskEntityRepository.find({ where: { user: data.id } });
    }
  }

  async getAllonClick(data, date): Promise<Exam[]> {
    const exams = await this.taskEntityRepository.find({
      where: { user: data.id },
    });
    const currentExams: Exam[] = [];
    for (let i = 0; i < exams.length; i++) {
      let day: string = exams[i].date.getDate().toString();
      let month = (exams[i].date.getMonth() + 1).toString();
      if (day.length === 1) day = `0${day}`;
      if (month.length === 1) month = `0${month}`;
      const formattedDate = `${day}${month}${exams[i].date.getFullYear()}`;
      if (date === formattedDate) {
        currentExams.push(exams[i]);
      }
    }
    console.log(currentExams);
    return currentExams;
  }


  create(data): Promise<Exam> {
    return this.taskEntityRepository.save(data);
  }

  findOne(id: number): Promise<Exam> {
    return this.taskEntityRepository.findOne({ where: { id } });
  }

  async update(id: number, data): Promise<Exam> {

    await this.taskEntityRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.taskEntityRepository.delete({ id: id });
  }
}
