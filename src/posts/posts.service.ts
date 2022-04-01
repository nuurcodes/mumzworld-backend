import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Post } from 'posts/models/post.model';
import { GetPostArgs } from './dto/args/get-post.args';
import { GetPostsArgs } from './dto/args/get-posts.args';
import { DeletePostInput } from './dto/input/delete-post.input';
import { CreatePostInput } from './dto/input/create-post.input';
import { UpdatePostInput } from './dto/input/update-post.input';
import { PostsRepository } from './posts.repository';
import { PostDocument } from './models/post.schema';
import { UsersRepository } from 'users/users.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createPost(createPostData: CreatePostInput) {
    await this.validateCreatePostData(createPostData);
    const postDocument = await this.postsRepository.create(createPostData);
    return this.toModel(postDocument);
  }

  async updatePost(
    updatePostData: UpdatePostInput,
    postId: string,
  ): Promise<Post> {
    const postDocument = await this.postsRepository.findOneAndUpdate(
      { _id: postId },
      updatePostData,
    );
    return this.toModel(Object.assign(postDocument, updatePostData));
  }

  async getPost(getPostArgs: GetPostArgs): Promise<Post> {
    const postDocument = await this.postsRepository.findOne({
      _id: getPostArgs.postId,
    });
    return this.toModel(postDocument);
  }

  async getPosts(getPostsArgs: GetPostsArgs): Promise<Post[]> {
    const postsDocument = await this.postsRepository.find({
      _id: { $in: getPostsArgs.postIds },
    });
    return postsDocument.map((doc) => this.toModel(doc));
  }

  async getAllPosts(): Promise<Post[]> {
    const postsDocument = await this.postsRepository.find({});
    return postsDocument.map((doc) => this.toModel(doc));
  }

  async deletePost(deletePostData: DeletePostInput): Promise<Post> {
    const postDocument = await this.postsRepository.delete({
      _id: deletePostData.postId,
    });
    return this.toModel(postDocument);
  }

  private async validateCreatePostData(createPostData: CreatePostInput) {
    try {
      await this.usersRepository.findOne({
        _id: createPostData.userId,
      });
    } catch (err) {
      throw new UnprocessableEntityException('User does not exist');
    }
  }

  private toModel(postDocument: PostDocument): Post {
    return {
      _id: postDocument._id.toHexString(),
      userId: postDocument.userId,
      content: postDocument.content,
      imageUrl: postDocument.imageUrl,
      tags: postDocument.tags,
    };
  }
}
