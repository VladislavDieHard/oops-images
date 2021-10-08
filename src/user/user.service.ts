import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {User, UserDocument} from "./user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {UpdateUserNameDto} from "./dto/update-user-name.dto";
import {FileDescription, FileService, FileType} from "../file/file.service";
import {PostDocument, Post} from "../post/post.schema";
import * as bcrypt from "bcrypt"
import {UpdateUserPassDto} from "./dto/update-user-pass.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Post.name) private postModel: Model<PostDocument>,
                private fileService: FileService) {}

    async deleteUserPosts(user) {
        const posts = await this.postModel.find({author: user._id});
        posts.forEach((post) => {
            this.fileService.removeFile(post.images);
        });
        return this.postModel.deleteMany({author: user._id});
    }

    async getUsers(): Promise<User[]> {
        return this.userModel.find({},{password: 0});
    }

    async getUserById(id): Promise<User> {
        return this.userModel.findById(id, {password: 0}).populate('posts');
    }

    async getUserByName(username): Promise<User> {
        const user = await this.userModel.findOne({username: username});
        if (user !== null) {
            return user;
        }
        throw new HttpException({message: 'Пользователь с таким именем не найден'}, HttpStatus.NOT_FOUND);
    }

    async createUser(dto: CreateUserDto, image): Promise<User> {
        const candidate = await this.userModel.find({username: dto.username});

        if (candidate.length > 0) {
            throw new HttpException('Пользователь с таким именем уже существует', HttpStatus.BAD_REQUEST);
        } else {
            dto.password = await bcrypt.hash(dto.password, +process.env.SALT_ROUNDS);
            const user = await this.userModel.create({...dto});
            user.avatarUrl = this.fileService.saveFiles(FileType.IMAGE, FileDescription.AVATAR, image, user.username).join();
            await user.save();
            return user;
        }
    }

    async deleteUser(id: ObjectId): Promise<ObjectId> {
        const user = await this.userModel.findByIdAndDelete(id);
        let deletePostsResult;
        this.deleteUserPosts(user).then((result) => {deletePostsResult = result}).catch((e) => {return e.message});
        this.fileService.removeFile([user.avatarUrl]);
        return user._id;
    }

    async updateUserName(id: ObjectId, dto: UpdateUserNameDto): Promise<User>{
        return this.userModel.findByIdAndUpdate(id, dto);
    }

    async updateUserPassword(id: ObjectId, dto: UpdateUserPassDto) {

    }
}
