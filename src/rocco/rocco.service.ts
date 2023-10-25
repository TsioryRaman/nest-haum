import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rocco } from './entity/rocco.entity';
import {makeKeyPassRandom} from "./service/key";
@Injectable()
export class RoccoService {

    constructor(
        @InjectRepository(Rocco) private roccoRepository: Repository<Rocco>
    ) {}
    
    async generateRandomKey()
    {
        for(let i= 0;i < 100; i++)
        {
            let rocco = new Rocco();
            rocco.passKey = makeKeyPassRandom(16);
            await this.roccoRepository.save(rocco);
        }
    }
}
