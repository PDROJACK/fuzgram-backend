import { Test, TestingModule } from '@nestjs/testing';
import { FuzgramService } from './fuzgram.service';

describe('FuzgramService', () => {
  let service: FuzgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuzgramService],
    }).compile();

    service = module.get<FuzgramService>(FuzgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
