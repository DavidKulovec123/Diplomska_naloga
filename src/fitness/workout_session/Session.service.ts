import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './Session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly SessionEntityRepository: Repository<Session>,
  ) {}

  getAll(data): Promise<Session[]> {
    return this.SessionEntityRepository.createQueryBuilder()
      .select([
        'session.id',
        'session.session_name',
        'session.user',
        'workout.id',
        'workout.workout_name',
        'exercise.id',
        'exercise.name',
        'exercise.sets',
        'exercise.reps',
        'muscle.id',
        'muscle.muscle_name',
      ])
      .from(Session, 'session')
      .leftJoin('session.workouts', 'workout')
      .leftJoin('workout.exercise', 'exercise')
      .leftJoin('exercise.muscles', 'muscle')
      .where({ user: data.id })
      .getMany();
  }

  create(data): Promise<Session> {
    return this.SessionEntityRepository.save(data);
  }

  findOne(id: number): Promise<Session> {
    return this.SessionEntityRepository.findOne({ where: { id } });
  }

  async update(id: number, data): Promise<Session> {
    await this.SessionEntityRepository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.SessionEntityRepository.delete({ id: id });
  }
}
