import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(dto: UserLoginDto): Promise<any> {
        const validatedUser = await this.validateUser(dto);
        return await this.generateToken(validatedUser);
    }

    async register(dto: CreateUserDto, avatar) {
        const user = await this.usersService.createUser(dto, avatar);
        return this.generateToken(user);
    }

    private async generateToken(user: any) {
        const payload = { username: user.username, id: user.user_id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: UserLoginDto) {
        const user = await this.usersService.getUserByName(userDto.username);
        const passwordEquals = await bcrypt.compareSync(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректное имя пользователя или пароль'});
    }
}
