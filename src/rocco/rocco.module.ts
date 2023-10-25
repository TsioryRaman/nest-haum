import { Module } from '@nestjs/common';
import { RoccoService } from './rocco.service';
import { RoccoController } from './rocco.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rocco } from './entity/rocco.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Rocco])],
  providers: [RoccoService],
  controllers: [RoccoController]
})
export class RoccoModule {}
