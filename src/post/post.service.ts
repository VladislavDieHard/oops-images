import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {FileDescription, FileService, FileType} from "../file/file.service";
import {Post, PostDocument} from "./post.schema";
import {CreatePostDto} from "./dto/create-post.dto";
import {User, UserDocument} from "../user/user.schema";

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                private fileService: FileService
    ) {}

    private static deletePostFromUser(posts, deletePost) {
        const newPostsArr = [];
        posts.forEach((post) => {
            if (post !== deletePost) {
                newPostsArr.push(post);
            }
        });
        return newPostsArr
    }

    getPosts() {
        return this.postModel.find();
    }

    getPostsByTag(tag) {
        return this.postModel.find({tags: tag});
    }

    getPostById(id) {
        return this.postModel.findById(id);
    }

    getPostsByUserId(id) {
        return this.postModel.find({author: id});
    }

    async createPost(dto: CreatePostDto, images): Promise<Post> {
        const user = await this.userModel.findById(dto.author);
        const imagePaths = this.fileService.saveFiles(FileType.IMAGE, FileDescription.POST, images, user.username);
        const post = await this.postModel.create({...dto, images: imagePaths});
        user.posts.push(post._id);
        await user.save();
        return post;
    }

    async deletePost(id) {
        const post = await this.postModel.findByIdAndDelete(id);
        this.fileService.removeFile(post.images);
        const user = await this.userModel.findById(post.author);
        user.posts = [...PostService.deletePostFromUser(user.posts, post._id)];
        user.save();
        return post._id;
    }
}
