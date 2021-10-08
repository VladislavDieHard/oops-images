import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ObjectId} from "mongoose";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {PostOwnedGuard} from "../auth/post-owned.guard";

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    getPosts() {
        return this.postService.getPosts();
    }

    @Get(':id')
    getPostById(@Param('id') id: ObjectId) {
        return this.postService.getPostById(id);
    }

    @Get('/tag/:tagId')
    getPostsByTag(@Param('tagId') tagId: ObjectId) {
        return this.postService.getPostsByTag(tagId);
    }

    @Get('/user/:userId')
    getPostsByUserId(@Param('userId') userId: ObjectId) {
        return this.postService.getPostsByUserId(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([{
        name: 'image', maxCount: 10
    }]))
    createPost(@UploadedFiles() files, @Body() dto: CreatePostDto) {
        return this.postService.createPost(dto, files.image);
    }

    @UseGuards(JwtAuthGuard, PostOwnedGuard)
    @Delete(':id')
    deletePost(@Param('id') id: ObjectId): Promise<ObjectId> {
        return this.postService.deletePost(id);
    }
}
