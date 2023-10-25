import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './Dto/create-user.dto';
import { UpdateUserDto } from './Dto/update-user.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Rocco } from 'src/rocco/entity/rocco.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rocco) private roccoRepository: Repository<Rocco>
  ) {}

  /**
   * Cree un utilisateur
   * @param {CreateUserDto} user
   * @returns {User}
   */
  async create(user: CreateUserDto) {
    console.log("ici");
    let _rocco:Rocco;

    try{
      _rocco = await this.roccoRepository.findOneByOrFail({
        passKey: user.rocco.passKey
      })
    }catch(e)
    {
      throw new HttpException({passKey:"Desole,ce clef de produit ROCCO n'existe pas"},HttpStatus.EXPECTATION_FAILED)
    }

    if(_rocco.user)
    {
    throw new HttpException({passKey:"Desole,ce clef de produit ROCCO est deja utilise par un autre compte,veuillez essayer un nouveau"},HttpStatus.CONFLICT)
    }

    let _user = await this.userRepository.findOneBy({
      username: user.username,
    });

    if(_user){
      throw new HttpException({username:"Ce nom d'utilisateur a ete deja utilise avec un autre compte"},HttpStatus.CONFLICT);
    }

    _user = await this.userRepository.findOneBy({
      email: user.email,
    });

    if(_user){
      throw new HttpException({email:"Cet email a ete deja utilise avec un autre compte"},HttpStatus.CONFLICT);
    }

    try {
      const saltOrRounds = 10;
      /**
       * {string} password
       */
      const password = await bcrypt.hash(user.password, saltOrRounds);
      user.password = password;
      let _user:User = user as User;
      _rocco.user = _user;
      const {user: _u} = await this.roccoRepository.save(_rocco);
      return _u;
    } catch (e) {
      console.error(e)
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
