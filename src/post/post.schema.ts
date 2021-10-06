import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
import {User} from "../user/user.schema";
import * as mongoose from "mongoose";
import {Tag} from "../tag/tag.schema";


export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop()
    title: string;

    @Prop()
    images: string[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]})
    tags: Tag[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post)