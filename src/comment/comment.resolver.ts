import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from '@comment/comment.service';
import { Comment } from '@comment/entities/comment.entity';
import { CreateCommentInput } from '@comment/dto/input/create-comment.input';
import { DeleteCommentInput } from '@comment/dto/input/delete-comment.input';
import { GetCommentArgs } from '@comment/dto/args/get-comment.args';
import { GqlAuthGuard } from '@auth/guards/gql-auth.guard';
import { CurrentUser } from '@auth/current-user.decorator';
import { User } from '@user/entities/user.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment, { name: 'createComment' })
  async create(
    @Args('createCommentData') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ) {
    return this.commentService.create(createCommentInput, user);
  }

  @Query(() => [Comment], { name: 'getAllComments', nullable: true })
  async findAll() {
    return this.commentService.findAll();
  }

  @Query(() => Comment, { name: 'getPostById' })
  async findOne(@Args() getCommentArgs: GetCommentArgs) {
    return this.commentService.findOne({ id: getCommentArgs.id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment, { name: 'deleteComment' })
  async delete(
    @Args('deleteCommentData') deleteCommentData: DeleteCommentInput,
    @CurrentUser() user: User,
  ) {
    return this.commentService.delete(deleteCommentData, user);
  }
}
