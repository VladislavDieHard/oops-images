import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ObjectId} from "mongoose";
import {UpdateUserNameDto} from "./dto/update-user-name.dto";
import {UpdateUserPassDto} from "./dto/update-user-pass.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: ObjectId) {
        return this.userService.getUserById(id);
    }

    @Get(':username')
    getUserByName(@Param('username') username: string) {
        return this.userService.getUserById(username);
    }

    @Put(':id')
    updateUserName(@Param('id') id: ObjectId, @Body() dto: UpdateUserNameDto) {
        return this.userService.updateUserName(id, dto);
    }

    @Put(':id')
    updateUserPassword(@Param('id') id: ObjectId, @Body() dto: UpdateUserPassDto) {
        return this.userService.updateUserPassword(id, dto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: ObjectId): Promise<ObjectId> {
        return this.userService.deleteUser(id);
    }
}
