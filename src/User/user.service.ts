import { Injectable } from '@nestjs/common';
import { Person } from './interfaces/Person.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './Dto/create-user.dto';
import { UpdateUserDto } from './Dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    try {
      return this.userRepository.save(user);
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(id:number){
    return this.userRepository.findOneByOrFail({id});
  }

  update(id:number,user:UpdateUserDto):Promise<UpdateResult>{
    return this.userRepository.update({id},user);
  }
  
  delete(id:number):Promise<DeleteResult>{
    return this.userRepository.delete(id);
  }

}
