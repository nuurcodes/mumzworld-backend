import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePostInput } from '@post/dto/input/create-post.input';
import { UpdatePostInput } from '@post/dto/input/update-post.input';
import { Post } from '@post/entities/post.entity';
import { GetPostArgs } from '@post/dto/args/get-post.args';
import { DeleteUserInput } from '@user/dto/input/delete-user.input';
import { User } from '@user/entities/user.entity';
import { Comment } from '@comment/entities/comment.entity';
import { CommentService } from '@comment/comment.service';
import { LikeService } from '@like/like.service';
import { Like } from '@like/entities/like.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly commentService: CommentService,
    @Inject(forwardRef(() => LikeService))
    private readonly likeService: LikeService,
  ) {}
  async create(createPostData: CreatePostInput, user: User): Promise<Post> {
    return this.postRepository.save({ ...createPostData, user });
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['user', 'comments', 'likes'],
    });
  }

  async findOne(getPostArgs: GetPostArgs): Promise<Post> {
    return this.postRepository.findOne({
      where: { id: getPostArgs.id },
      relations: ['user', 'comments', 'likes'],
    });
  }

  async findOneFromUser(getPostArgs: GetPostArgs, user: User): Promise<Post> {
    return this.postRepository.findOne({
      where: { id: getPostArgs.id, user: { id: user.id } },
      relations: ['user', 'comments', 'likes'],
    });
  }

  async update(
    updatePostData: UpdatePostInput,
    id: string,
    user: User,
  ): Promise<Post> {
    await this.postRepository.update(
      { id, user: { id: user.id } },
      updatePostData,
    );
    return this.findOne({ id });
  }

  async delete(deleteUserData: DeleteUserInput, user: User): Promise<Post> {
    const post = await this.findOneFromUser(
      {
        id: deleteUserData.id,
      },
      user,
    );
    await this.postRepository.delete(deleteUserData.id);
    return post;
  }

  async getComments(postId: string): Promise<Comment[]> {
    return this.commentService.findCommentsForPost(postId);
  }

  async getLikes(postId: string): Promise<Like[]> {
    return this.likeService.findLikesForPost(postId);
  }
}
