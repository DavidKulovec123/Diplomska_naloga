import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './Exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseEntityRepository: Repository<Exercise>,
  ) {}

  async getAll(): Promise<Exercise[]> {
    const res = await this.exerciseEntityRepository.find();
    //console.log(res);
    return res;
  }

  async create(data): Promise<Exercise> {
    return this.exerciseEntityRepository.save(data);
  }

  findById(index: any): Promise<Exercise> {
    return this.exerciseEntityRepository.findOne(index);
  }
  findOne(id: number): Promise<Exercise> {
    return this.exerciseEntityRepository.findOne({ where: { id } });
  }

  async update(id: number, data): Promise<Exercise> {
    await this.exerciseEntityRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.exerciseEntityRepository.delete({ id: id });
  }
}
