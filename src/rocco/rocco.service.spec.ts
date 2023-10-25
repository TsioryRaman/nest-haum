import { Test, TestingModule } from '@nestjs/testing';
import { RoccoService } from './rocco.service';

describe('RoccoService', () => {
  let service: RoccoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoccoService],
    }).compile();

    service = module.get<RoccoService>(RoccoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
