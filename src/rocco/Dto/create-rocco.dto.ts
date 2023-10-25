import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto{
    id:number;

    @IsNotEmpty()
    @Length(16,16)
    keyPass:string;
}