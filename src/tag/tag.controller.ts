import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ObjectId} from "mongoose";
import {TagService} from "./tag.service";
import {CreateTagDto} from "./dto/create-tag.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('tags')
export class TagController {
    constructor(private tagService: TagService) {}

    @Get()
    getTags() {
        return this.tagService.getTags();
    }

    @Get(':id')
    getTagById(@Param('id') id: ObjectId) {
        return this.tagService.getTagById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createTag(@Body() dto: CreateTagDto) {
        return this.tagService.createTag(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateTag(@Param('id') id: ObjectId, @Body() dto: UpdateTagDto) {
        return this.tagService.updateTag(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteTag(@Param('id') id: ObjectId): Promise<ObjectId> {
        return this.tagService.deleteTag(id);
    }
}
