import {forwardRef, Module} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import {FileService} from "../file/file.service";
import {PostModule} from "../post/post.module";
import {Post, PostSchema} from "../post/post.schema";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
      forwardRef(() => PostModule),
      forwardRef(() => AuthModule)
  ],
  providers: [UserService, FileService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
