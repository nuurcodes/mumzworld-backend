import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/input/create-like.input';
import { CurrentUser } from 'auth/current-user.decorator';
import { User } from 'user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'auth/guards/gql-auth.guard';
import { GetLikeArgs } from './dto/args/get-like.args';
import { DeleteLikeInput } from './dto/input/delete-like.input';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  @UseGuards(GqlAuthGuard)
  async createLike(
    @Args('createLikeData') createLikeInput: CreateLikeInput,
    @CurrentUser() user: User,
  ) {
    return this.likeService.create(createLikeInput, user);
  }

  @Query(() => [Like], { name: 'getAllLikes', nullable: true })
  async findAll() {
    return this.likeService.findAll();
  }

  @Query(() => Like, { name: 'getLikeById' })
  async findOne(@Args() getLikeArgs: GetLikeArgs) {
    return this.likeService.findOne({ id: getLikeArgs.id });
  }

  @Mutation(() => Like)
  async delete(@Args('deleteLikeData') deleteLikeData: DeleteLikeInput) {
    return this.likeService.delete(deleteLikeData);
  }
}
