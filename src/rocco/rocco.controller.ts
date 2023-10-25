import { Controller, Get } from '@nestjs/common';
import { RoccoService } from './rocco.service';

@Controller('rocco')
export class RoccoController {

    constructor(private roccoService: RoccoService)
    {
    }

    @Get()
    generateKey()
    {
        this.roccoService.generateRandomKey();
        return "ok";
    }

}
