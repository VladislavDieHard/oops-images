import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRES_TIME },
      })
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [
      AuthService,
      JwtModule
  ]
})
export class AuthModule {}
