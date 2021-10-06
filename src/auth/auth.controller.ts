import {Body, Controller, Post, Request, UploadedFiles, UseGuards, UseInterceptors} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthGuard} from "@nestjs/passport";


@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    // @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() dto: UserLoginDto) {
        console.log(process.env.JWT_SECRET)
        return this.authService.login(dto);
    }

    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'image', maxCount: 1
    }]))
    createUser(@UploadedFiles() files, @Body() dto: CreateUserDto) {
        return this.userService.createUser(dto, files.image);
    }
}