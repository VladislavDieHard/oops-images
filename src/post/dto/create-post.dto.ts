import {ObjectId} from "mongoose";

export class CreatePostDto {
    readonly title: string;
    readonly tags: string[];
    readonly author: ObjectId;
}