import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './Dto/signin-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post("login")
    signIn(@Body() signInDto:SignInDTO){
        return this.authService.signIn(signInDto);
    }

}
