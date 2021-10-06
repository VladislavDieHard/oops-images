import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      UserModule,
      PassportModule,
      ConfigModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'Secret',
        signOptions: { expiresIn: process.env.TOKEN_EXPIRES_TIME }
      })
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
