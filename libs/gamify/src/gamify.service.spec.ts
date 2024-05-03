import { Test, TestingModule } from '@nestjs/testing';
import { GamifyService } from './gamify.service';

describe('GamifyService', () => {
  let service: GamifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamifyService],
    }).compile();

    service = module.get<GamifyService>(GamifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
