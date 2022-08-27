import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  create(data): Promise<User> {
    return this.userRepository.save(data);
  }

  findOne(condition): Promise<User> {
    return this.userRepository.findOne(condition);
  }
  findOne2(condition): Promise<User> {
    return this.userRepository.findOne(condition);
  }
  async update(id, data): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findOne({ id });
  }

  delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  async getAllClassUsers(data, id): Promise<User[]> {
    const currentUser = await User.findOne(data.id);
    console.log(currentUser.id);
    console.log(id);
    return this.userRepository.find({
      where: { razred: currentUser.razred.id },
    });
  }
}
