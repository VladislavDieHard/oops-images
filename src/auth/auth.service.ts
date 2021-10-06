import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt'
import {UserLoginDto} from "./dto/user-login.dto";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(dto: UserLoginDto): Promise<any> {
        const user = await this.usersService.getUserByName(dto.username);
        const compare = bcrypt.compareSync(dto.password, user.password);
        if (compare) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.user_id}
        return  {
            access_token: this.jwtService.sign(payload)
        }
    }

}
