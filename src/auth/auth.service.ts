import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './Dto/signin-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDTO): Promise<any> {
    let user;
    try{
      user = await this.userService.findBy(signInDto.username);
    }catch(erro){
      throw new UnauthorizedException();
    }
    // Comparaison du MDP
    if (user) {
      const isMatch = await bcrypt.compare(signInDto.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '3600s',
        }),
        expires_in: 3600,
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        }),
      };
    }

  }
}
