import { CreateUserDto } from "./create-rocco.dto";
import { PartialType } from '@nestjs/swagger';


export class UpdateUserDto extends PartialType(CreateUserDto){}
