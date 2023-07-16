import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './Dto/create-user.dto';
import { UpdateUserDto } from './Dto/update-user.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Cree un utilisateur
   * @param {CreateUserDto} user
   * @returns {User}
   */
  async create(user: CreateUserDto) {

    const _user = await this.userRepository.findBy({
      email: user.email,
      username: user.username,
    });

    console.log(_user)
    if(_user.length > 0){
      console.log("LOL")
      throw new HttpException("username or email already exists",HttpStatus.CONFLICT);
      return;
    }

    try {
      const saltOrRounds = 10;
      /**
       * {string} password
       */
      const password = await bcrypt.hash(user.password, saltOrRounds);
      user.password = password;
      return this.userRepository.save(user);
    } catch (e) {
      console.log(e)
      throw new HttpException("Error during saving user",HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findBy(username: string) {
    return this.userRepository.findOneByOrFail({ username });
  }

  /**
   * Trouve tout les utilisateurs
   * @returns {User[]}
   */
  findAll() {
    return this.userRepository.find();
  }

  /**
   * Trouve un utilisateur
   * @param {number} id
   * @returns {User|Fail}
   */
  findById(id: number) {
    return this.userRepository.findOneByOrFail({ id });
  }

  /**
   * Met a jour un utilisateur
   * @param {number} id
   * @param {UpdateUserDto} user
   * @returns {Promise<UpdateResult>}
   */
  update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update({ id }, user);
  }

  /**
   * Supprime un utilisateur par son ID
   * @param {number} id
   * @returns {Promise<DeleteResult>}
   */
  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
