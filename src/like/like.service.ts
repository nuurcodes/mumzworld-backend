import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeInput } from './dto/input/create-like.input';
import { DeleteLikeInput } from './dto/input/delete-like.input';
import { User } from 'user/entities/user.entity';
import { Like } from './entities/like.entity';
import { GetLikeArgs } from './dto/args/get-like.args';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(createCommentData: CreateLikeInput, user: User) {
    return this.likeRepository.save({
      ...createCommentData,
      user,
    });
  }

  async findLikesForPost(postId: string): Promise<Like[]> {
    return this.likeRepository.find({
      where: { post_id: postId },
      relations: ['post', 'user'],
    });
  }

  async findOne(getLikeArgs: GetLikeArgs): Promise<Like> {
    return this.likeRepository.findOne({
      where: { id: getLikeArgs.id },
      relations: ['post', 'user'],
    });
  }

  async findOneFromUser(getLikeArgs: GetLikeArgs, user: User): Promise<Like> {
    return this.likeRepository.findOne({
      where: { id: getLikeArgs.id, user_id: user.id },
      relations: ['post', 'user'],
    });
  }

  async findAll(): Promise<Like[]> {
    return this.likeRepository.find({ relations: ['post', 'user'] });
  }

  async delete(deleteCommentData: DeleteLikeInput, user: User): Promise<Like> {
    const comment = await this.findOneFromUser(
      { id: deleteCommentData.id },
      user,
    );
    await this.likeRepository.delete(deleteCommentData.id);
    return comment;
  }
}
