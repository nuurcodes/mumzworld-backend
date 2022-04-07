import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '@comment/comment.service';
import { CommentResolver } from '@comment/comment.resolver';
import { Comment } from '@comment/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
