import { Test, TestingModule } from '@nestjs/testing';
import { WorkTaskController } from './WorkTask.controller';

describe('TaskController', () => {
  let controller: WorkTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkTaskController],
    }).compile();

    controller = module.get<WorkTaskController>(WorkTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
