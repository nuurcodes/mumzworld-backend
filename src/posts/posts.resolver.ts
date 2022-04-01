import { Post } from 'posts/models/post.model';
import { GetPostArgs } from 'posts/dto/args/get-post.args';
import { PostsService } from 'posts/posts.service';
import { GetPostsArgs } from './dto/args/get-posts.args';
import { CreatePostInput } from './dto/input/create-post.input';
import { UpdatePostInput } from './dto/input/update-post.input';
import { DeletePostInput } from './dto/input/delete-post.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post, { name: 'post', nullable: true })
  async getPost(@Args() getPostArgs: GetPostArgs): Promise<Post> {
    const post = await this.postsService.getPost(getPostArgs);
    return post;
  }

  @Query(() => [Post], { name: 'posts', nullable: 'items' })
  async getPosts(@Args() getPostsArgs: GetPostsArgs): Promise<Post[]> {
    const posts = await this.postsService.getPosts(getPostsArgs);
    return posts;
  }

  @Query(() => [Post], { name: 'allPosts', nullable: 'items' })
  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postsService.getAllPosts();
    return posts;
  }

  @Mutation(() => Post)
  async createPost(
    @Args('createPostData') createPostData: CreatePostInput,
  ): Promise<Post> {
    const newPost = await this.postsService.createPost(createPostData);
    return newPost;
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('updatePostData') updatePostData: UpdatePostInput,
  ): Promise<Post> {
    const post = this.postsService.updatePost(
      updatePostData,
      updatePostData.postId,
    );
    return post;
  }

  @Mutation(() => Post)
  async detelePost(
    @Args('deletePostData') deletePostData: DeletePostInput,
  ): Promise<Post> {
    const post = this.postsService.deletePost(deletePostData);
    return post;
  }
}
