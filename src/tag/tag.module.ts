import {forwardRef, Module} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import {PostModule} from "../post/post.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Tag, TagSchema} from "./tag.schema";
import {Post, PostSchema} from "../post/post.schema";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Tag.name, schema: TagSchema}]),
      MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
      forwardRef(() => PostModule),
      forwardRef(() => UserModule),
      AuthModule,
  ],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule {}
