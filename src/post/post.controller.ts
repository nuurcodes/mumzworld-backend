import * as path from 'path';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  BadRequestException,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('post')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/post_images',
        filename: (req, file, cb) => {
          const postId = req.query['postId'];
          const parsedPostId = Array.isArray(postId)
            ? (postId[0] as string)
            : (postId as string);

          if (!postId) {
            return cb(new BadRequestException(), null);
          }

          const fileName: string = parsedPostId;
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${fileName}${extension}`);
        },
      }),

      // TODO: Add file filter PNG/JPG
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('postId') postId: string,
  ) {
    const imageUrl = this.configService.get('SERVER_URL') + '/' + file.path;
    return this.postService.update({ imageUrl, id: postId }, postId);
  }
}
