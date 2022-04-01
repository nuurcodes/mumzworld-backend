import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/input/create-post.input';
import { UpdatePostInput } from './dto/input/update-post.input';
import { GetPostArgs } from './dto/args/get-post.args';
import { DeletePostInput } from './dto/input/delete-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostData') createPostData: CreatePostInput) {
    return this.postService.create(createPostData);
  }

  @Query(() => [Post], { name: 'getAllPosts', nullable: true })
  async findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'getPostById' })
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
}
