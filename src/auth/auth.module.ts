import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/User/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configuration from "../configuration/jwt-config"
@Module({
  imports:[UserModule,JwtModule.register({
    global:true,
    secret:"SECRET"
  }),
ConfigModule.forRoot({
  load:[configuration]
})],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
