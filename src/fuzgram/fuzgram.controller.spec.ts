import { Test, TestingModule } from '@nestjs/testing';
import { FuzgramController } from './fuzgram.controller';

describe('FuzgramController', () => {
  let controller: FuzgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuzgramController],
    }).compile();

    controller = module.get<FuzgramController>(FuzgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
