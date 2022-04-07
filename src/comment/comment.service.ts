import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentInput } from '@comment/dto/input/create-comment.input';
import { DeleteCommentInput } from '@comment/dto/input/delete-comment.input';
import { Comment } from '@comment/entities/comment.entity';
import { GetCommentArgs } from '@comment/dto/args/get-comment.args';
import { User } from '@user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentData: CreateCommentInput, user: User) {
    return this.commentRepository.save({
      ...createCommentData,
      user,
    });
  }

  async findCommentsForPost(postId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post_id: postId },
      relations: ['post', 'user'],
    });
  }

  async findOne(getCommentArgs: GetCommentArgs): Promise<Comment> {
    return this.commentRepository.findOne({
      where: { id: getCommentArgs.id },
      relations: ['post', 'user'],
    });
  }

  async findOneFromUser(
    getCommentArgs: GetCommentArgs,
    user: User,
  ): Promise<Comment> {
    return this.commentRepository.findOne({
      where: { id: getCommentArgs.id, user_id: user.id },
      relations: ['post', 'user'],
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['post', 'user'] });
  }

  async delete(
    deleteCommentData: DeleteCommentInput,
    user: User,
  ): Promise<Comment> {
    const comment = await this.findOneFromUser(
      { id: deleteCommentData.id },
      user,
    );
    await this.commentRepository.delete(deleteCommentData.id);
    return comment;
  }
}
