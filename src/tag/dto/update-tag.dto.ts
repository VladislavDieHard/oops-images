import {ObjectId} from "mongoose";

export class UpdateTagDto {
    readonly title: string;
    readonly description: string;
    // readonly posts: ObjectId[];
}