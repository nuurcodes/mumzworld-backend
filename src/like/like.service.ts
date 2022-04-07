import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeInput } from '@like/dto/input/create-like.input';
import { DeleteLikeInput } from '@like/dto/input/delete-like.input';
import { GetLikeArgs } from '@like/dto/args/get-like.args';
import { Like } from '@like/entities/like.entity';
import { User } from '@user/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(createLikeData: CreateLikeInput, user: User) {
    try {
      const like = await this.findOne({
        post_id: createLikeData.post_id,
        user_id: user.id,
      });
      return this.delete({ id: like.id }, user);
    } catch {
      return this.likeRepository.save({
        ...createLikeData,
        user,
      });
    }
  }

  async findLikesForPost(postId: string): Promise<Like[]> {
    return this.likeRepository.find({
      where: { post_id: postId },
      relations: ['post', 'user'],
    });
  }

  async findOne(getLikeArgs: GetLikeArgs): Promise<Like> {
    return this.likeRepository.findOne({
      where: { ...getLikeArgs },
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
