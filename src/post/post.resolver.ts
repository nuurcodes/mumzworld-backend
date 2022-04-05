import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/input/create-post.input';
import { UpdatePostInput } from './dto/input/update-post.input';
import { GetPostArgs } from './dto/args/get-post.args';
import { DeletePostInput } from './dto/input/delete-post.input';
import { UseGuards } from '@nestjs/common';
import { User } from 'user/entities/user.entity';
import { GqlAuthGuard } from 'auth/guards/gql-auth.guard';
import { CurrentUser } from 'auth/current-user.decorator';
import { Like } from 'like/entities/like.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args('createPostData') createPostData: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(createPostData, user);
  }

  @Query(() => [Post], { name: 'getAllPosts', nullable: true })
  async findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'getPostById', nullable: true })
  findOne(@Args() getPostArgs: GetPostArgs) {
    return this.postService.findOne({ id: getPostArgs.id });
  }

  @Mutation(() => Post)
  async update(
    @Args('updatePostData') updatePostData: UpdatePostInput,
  ): Promise<Post> {
    return this.postService.update(updatePostData, updatePostData.id);
  }

  @Mutation(() => Post)
  async delete(
    @Args('deletePostData') deletePostData: DeletePostInput,
  ): Promise<Post> {
    return this.postService.delete(deletePostData);
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() post: Post) {
    return this.postService.getComments(post.id);
  }

  @ResolveField(() => [Like])
  async likes(@Parent() post: Post) {
    return this.postService.getLikes(post.id);
  }
}
