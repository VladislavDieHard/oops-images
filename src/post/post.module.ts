import {forwardRef, Module} from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./post.schema";
import {TagModule} from "../tag/tag.module";
import {UserModule} from "../user/user.module";
import {FileService} from "../file/file.service";
import {User, UserSchema} from "../user/user.schema";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      forwardRef(() => TagModule),
      forwardRef(() => UserModule),
      AuthModule
  ],
  providers: [PostService, FileService],
  controllers: [PostController]
})
export class PostModule {}
