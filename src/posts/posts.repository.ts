import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'database/abstract.repository';
import { PostDocument } from './models/post.schema';
import { Post } from './models/post.model';
import { Model } from 'mongoose';

@Injectable()
export class PostsRepository extends AbstractRepository<PostDocument> {
  protected readonly logger = new Logger(PostsRepository.name);

  constructor(@InjectModel(Post.name) postmodel: Model<PostDocument>) {
    super(postmodel);
  }
}
