import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/input/create-post.input';
import { UpdatePostInput } from './dto/input/update-post.input';
import { Post } from './entities/post.entity';
import { GetPostArgs } from './dto/args/get-post.args';
import { DeleteUserInput } from 'user/dto/input/delete-user.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  async create(createPostInput: CreatePostInput): Promise<Post> {
    return this.postRepository.save(createPostInput);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(getPostArgs: GetPostArgs): Promise<Post> {
    return this.postRepository.findOne({ where: { id: getPostArgs.id } });
  }

  async update(updatePostData: UpdatePostInput, id: string): Promise<Post> {
    await this.postRepository.update(id, updatePostData);
    return this.findOne({ id });
  }

  async delete(deleteUserData: DeleteUserInput): Promise<Post> {
    const user = await this.findOne({ id: deleteUserData.id });
    await this.postRepository.delete(deleteUserData.id);
    return user;
  }
}
