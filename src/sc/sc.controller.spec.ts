import { Test, TestingModule } from '@nestjs/testing';
import { ScController } from './sc.controller';

describe('ScController', () => {
  let controller: ScController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScController],
    }).compile();

    controller = module.get<ScController>(ScController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
