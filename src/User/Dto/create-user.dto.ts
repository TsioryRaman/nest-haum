import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Rocco } from "src/rocco/entity/rocco.entity";

export class CreateUserDto{
    id:number;

    @IsNotEmpty()
    @Length(3,255)
    username:string;

    @IsNotEmpty()
    @Length(3,255)
    lastname:string;
    
    rocco:Rocco;

    @IsNotEmpty()
    @Length(5,255)
    password:string;

    @IsNotEmpty()
    @Length(4,255)
    address:string;

    @IsEmail()
    email:string;
}