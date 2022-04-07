import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LikeService } from '@like/like.service';
import { Like } from '@like/entities/like.entity';
import { CreateLikeInput } from '@like/dto/input/create-like.input';
import { GetLikeArgs } from '@like/dto/args/get-like.args';
import { DeleteLikeInput } from '@like/dto/input/delete-like.input';
import { GqlAuthGuard } from '@auth/guards/gql-auth.guard';
import { CurrentUser } from '@auth/current-user.decorator';
import { User } from '@user/entities/user.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like, { name: 'createLike' })
  @UseGuards(GqlAuthGuard)
  async create(
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Like, { name: 'deleteLike' })
  async delete(
    @Args('deleteLikeData') deleteLikeData: DeleteLikeInput,
    @CurrentUser() user: User,
  ) {
    return this.likeService.delete(deleteLikeData, user);
  }
}
