import { Test, TestingModule } from '@nestjs/testing';
import { ClassExamsService } from './ClassExams.service';

describe('ClassExamService', () => {
  let service: ClassExamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassExamsService],
    }).compile();

    service = module.get<ClassExamsService>(ClassExamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
