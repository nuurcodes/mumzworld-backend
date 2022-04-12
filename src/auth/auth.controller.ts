import { Response } from 'express';
import { User } from '@user/entities/user.entity';
import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { CurrentUser } from '@auth/current-user.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    const { id, email, username, image_url } = user;
    response.send({
      id,
      email,
      username,
      image_url,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verify(@CurrentUser() user: User, @Res() response: Response) {
    const { id, email, username, image_url } = user;
    response.send({
      id,
      email,
      username,
      image_url,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    response.json({});
  }
}
