import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '@post/post.service';
import { PostResolver } from '@post/post.resolver';
import { PostsController } from '@post/post.controller';
import { Post } from '@post/entities/post.entity';
import { CommentModule } from '@comment/comment.module';
import { LikeModule } from '@like/like.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommentModule,
    forwardRef(() => LikeModule),
  ],
  controllers: [PostsController],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
