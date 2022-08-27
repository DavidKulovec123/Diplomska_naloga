import { Test, TestingModule } from '@nestjs/testing';
import {ExamController} from './Exam.controller';

describe('TaskController', () => {
    let controller: ExamController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExamController],
        }).compile();

        controller = module.get<ExamController>(ExamController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
