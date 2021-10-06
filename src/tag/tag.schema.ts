import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import {Post} from "../post/post.schema";


export type TagDocument = Tag & Document;

@Schema()
export class Tag {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]})
    posts: Post[];
}

export const TagSchema = SchemaFactory.createForClass(Tag)