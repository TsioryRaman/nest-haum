import { Test, TestingModule } from '@nestjs/testing';
import { RoccoController } from './rocco.controller';

describe('RoccoController', () => {
  let controller: RoccoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoccoController],
    }).compile();

    controller = module.get<RoccoController>(RoccoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
