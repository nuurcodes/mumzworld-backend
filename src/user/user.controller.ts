import * as path from 'path';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile_images',
        filename: (req, file, cb) => {
          const userId = req['res']['req']['user']['id'];
          const fileName: string = userId;
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${fileName}${extension}`);
        },
      }),
      // TODO: Add file filter PNG/JPG
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const { id } = req.user as User;
    const imageUrl = this.configService.get('SERVER_URL') + '/' + file.path;
    return this.userService.update({ image_url: imageUrl, id }, id);
  }
}
