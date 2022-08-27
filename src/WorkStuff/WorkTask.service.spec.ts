import { Test, TestingModule } from '@nestjs/testing';
import { WorkTaskService } from './WorkTask.service';

describe('TaskService', () => {
  let service: WorkTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkTaskService],
    }).compile();

    service = module.get<WorkTaskService>(WorkTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
