import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Rocco } from 'src/rocco/entity/rocco.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User,Rocco])],
    providers: [UserService],
    controllers: [UserController],
    exports:[UserService]
})
export class UserModule {}
