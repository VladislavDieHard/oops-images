import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    UseGuards,
} from '@nestjs/common';
import {UserService} from "./user.service";
import {ObjectId} from "mongoose";
import {UpdateUserNameDto} from "./dto/update-user-name.dto";
import {UpdateUserPassDto} from "./dto/update-user-pass.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: ObjectId) {
        return this.userService.getUserById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateUserName(@Param('id') id: ObjectId, @Body() dto: UpdateUserNameDto) {
        return this.userService.updateUserName(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateUserPassword(@Param('id') id: ObjectId, @Body() dto: UpdateUserPassDto) {
        return this.userService.updateUserPassword(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: ObjectId): Promise<ObjectId> {
        return this.userService.deleteUser(id);
    }
}
