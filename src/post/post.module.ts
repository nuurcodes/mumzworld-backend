import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './post.controller';
import { Post } from './entities/post.entity';
import { CommentModule } from 'comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CommentModule],
  controllers: [PostsController],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
