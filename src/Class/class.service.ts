import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Razred } from './class.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { User } from '../user/user.entity';
import { JoinClassDto } from './JoinClassDto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Razred)
    private readonly classRepository: Repository<Razred>,
  ) {}

  async getAll(user): Promise<Razred[]> {
    const currentUser = await User.findOne(user.id);

    if (currentUser.razred == null) {
      return this.classRepository.find();
    } else {
      console.log(currentUser);
      return this.classRepository.find({
        where: { id: currentUser.razred.id },
      });
    }
  }

  create(data): Promise<Razred> {
    return this.classRepository.save(data);
  }

  findOne(id: number): Promise<Razred> {
    return this.classRepository.findOne({ where: { id } });
  }

  async UserGetsAClass(id: number, code, user): Promise<void> {
    const razred = await this.classRepository.findOne({ where: { id } });
    const currentUser = await User.findOne(user.id);
    if (razred.class_code === code.class_code) {
      currentUser.razred = id;
      User.save(currentUser);
    }
  }

  async update(id: number, data): Promise<Razred> {
    await this.classRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.classRepository.delete({ id: id });
  }

  async getAllUsers(user): Promise<User> {
    return await User.findOne(user.id);
  }
}
