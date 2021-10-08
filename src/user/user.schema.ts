import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
import {Post} from "../post/post.schema";
import * as mongoose from "mongoose";


export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({unique: true})
    username: string;

    @Prop()
    password: string;

    @Prop()
    avatarUrl: string;

    // @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]})
    // role: Role[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]})
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User)