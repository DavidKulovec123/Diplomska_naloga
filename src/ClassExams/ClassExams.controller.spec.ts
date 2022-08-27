import { Test, TestingModule } from '@nestjs/testing';
import {ClassExamsController} from './ClassExams.controller';

describe('TaskController', () => {
    let controller: ClassExamsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClassExamsController],
        }).compile();

        controller = module.get<ClassExamsController>(ClassExamsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
