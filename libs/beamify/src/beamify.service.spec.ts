import { Test, TestingModule } from '@nestjs/testing';
import { BeamifyService } from './beamify.service';

describe('BeamifyService', () => {
  let service: BeamifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeamifyService],
    }).compile();

    service = module.get<BeamifyService>(BeamifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
