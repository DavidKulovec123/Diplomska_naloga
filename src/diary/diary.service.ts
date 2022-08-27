import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from './diary.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}

  async getAll(data, dataFilters): Promise<Diary[]> {
    const diaries = await this.diaryRepository
      .createQueryBuilder()
      .select([
        'diary.id',
        'diary.title',
        'diary.content',
        'diary.created_at',
        'diary.updated_at',
        'user.id',
      ])
      .from(Diary, 'diary')
      .leftJoin('diary.user', 'user')
      .where('user.id = :id', { id: data.id })
      .andWhere(dataFilters)
      .getMany();

    return diaries;
  }

  create(data): Promise<Diary> {
    return this.diaryRepository.save(data);
  }

  findOne(id: number): Promise<Diary> {
    return this.diaryRepository.findOne({ where: { id } });
  }

  async update(id: number, data): Promise<Diary> {
    await this.diaryRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.diaryRepository.delete({ id: id });
  }
}
