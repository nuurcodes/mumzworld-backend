import { Module } from '@nestjs/common';
import { LikeService } from '@like/like.service';
import { LikeResolver } from '@like/like.resolver';
import { Like } from '@like/entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeResolver, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
