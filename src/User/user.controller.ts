import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './Dto/update-user.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Cree un nouveau User
   * @param user 
   * @returns 
   */
  @Post()
  async create(@Body() user: CreateUserDto) {
      return this.userService.create(user);
  }

  /**
   * Recupere toute l'utilisateur
   * @returns 
   */
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * Recupere un utilisateur par ID
   * @param params 
   * @returns 
   */
  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param() params:any):Promise<User>{
    try{
      return this.userService.findById(params.id);
    }catch(e){
      console.log("error")
      throw new HttpException("Entity not found",HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Mis a jour l'entite User
   * @param {string} id 
   * @param {UpdateUserDto} updateUserDto 
   * @returns 
   */
  @Put(":id")
  update(@Param('id') id:string,@Body() updateUserDto:UpdateUserDto):Promise<UpdateResult>{
    try{
      return this.userService.update(parseInt(id),updateUserDto);
    }catch(e){
      console.log("error")
      throw new HttpException("Entity not found",HttpStatus.NOT_FOUND);
    }
  }

  @Delete(":id")
  delete(@Param('id') id:string){
    return this.userService.delete(parseInt(id));
  }
}
