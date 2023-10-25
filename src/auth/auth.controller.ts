import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { SignInDTO } from './Dto/signin-dto';
import { AuthService } from './auth.service';

import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(
    @Res() res: Response,
    @Body() signInDto: SignInDTO,
  ) {
    const data = await this.authService.signIn(signInDto);
    res
      .cookie('access_token', data.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + data.expires_in),
      })
      .send({ status: HttpStatus.OK });
  }
}