import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassExam } from './ClassExams.entity';
import { Repository } from 'typeorm';
import { Diary } from '../diary/diary.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ClassExamsService {
  constructor(
    @InjectRepository(ClassExam)
    private readonly ClassExamsEntityRepository: Repository<ClassExam>,
  ) {}

  getAll(data): Promise<ClassExam[]> {
    return this.ClassExamsEntityRepository.find({
      where: { user: data.id },
    });
  }

  async getAllData(ids): Promise<ClassExam[]> {
    return this.ClassExamsEntityRepository.find({ where: { razred: ids } });
  }

  async getAllClassExams(data, ids): Promise<ClassExam[]> {
    const currentUser = await User.findOne(data.id);
    const currentClass = currentUser.razred.id;
    console.log(currentClass);
    console.log(currentUser);
    return this.ClassExamsEntityRepository.find({ where: { razred: ids } });
  }

  async getAllonClick(data, date, id): Promise<ClassExam[]> {
    const exams = await this.ClassExamsEntityRepository.find({
      where: { razred: id },
    });
    const currentExams: ClassExam[] = [];
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
  create(data): Promise<ClassExam> {
      return this.ClassExamsEntityRepository.save(data);

  }

  findOne(id: number): Promise<ClassExam> {
    return this.ClassExamsEntityRepository.findOne({ where: { id } });
  }

  async update(id: number, data): Promise<ClassExam> {
    await this.ClassExamsEntityRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.ClassExamsEntityRepository.delete({ id: id });
  }

  async getUsersInClass(id): Promise<ClassExam[]> {
    const query = await this.ClassExamsEntityRepository.createQueryBuilder()
      .select([
        'ClassExams.id',
        'ClassExams.title',
        'ClassExams.content',
        'ClassExams.location',
        'ClassExams.date',
        'ClassExams.Room',
        'ClassExams.Seat',
        'razred.id',
        'razred.class_name',
        'razred.class_code',
        'users.id',
        'users.first_name',
        'users.last_name',
      ])
      .from(ClassExam, 'ClassExams')
      .leftJoin('ClassExams.razred', 'razred')
      .leftJoin('razred.user', 'users')
      .where('razred.id =:id', { id })
      .getMany();

    return query;
  }
}
