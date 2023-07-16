import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto{
    id:number;

    @IsNotEmpty()
    @Length(3,255)
    username:string;

    @IsNotEmpty()
    @Length(3,255)
    lastname:string;

    @IsNotEmpty()
    @Length(5,255)
    password:string;

    @IsNotEmpty()
    @Length(4,255)
    address:string;

    @IsEmail()
    email:string;
}