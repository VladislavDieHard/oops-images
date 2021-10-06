import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Tag, TagDocument} from "./tag.schema";
import {CreateTagDto} from "./dto/create-tag.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";
import {Post, PostDocument} from "../post/post.schema";

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>,
                @InjectModel(Post.name) private postModel: Model<PostDocument>,
    ) {}

    getTags() {
        return this.tagModel.find();
    }

    getTagById(id) {
        return this.tagModel.findById(id);
    }

    async createTag(dto: CreateTagDto): Promise<Tag> {
        return await this.tagModel.create({...dto});
    }

    async updateTag(id, dto: UpdateTagDto) {
        const post = await this.postModel.findById(id);
        const tag = await this.tagModel.findByIdAndUpdate(id, {...dto});
        post.tags.push(tag._id);
        post.save();
        return
    }

    async deleteTag(id) {
        const tag = await this.tagModel.findByIdAndDelete(id);
        return tag._id;
    }
}
