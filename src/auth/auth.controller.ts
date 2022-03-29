import { Request, Response } from 'express';
import { User } from 'users/models/user.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from './current-user.decorator';

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
    response.send(user);
  }

  @Post('register')
  async register(@Req() req: Request): Promise<User> {
    const { email, password, username } = req.body;
    const user = await this.authService.register({ email, password, username });
    return user;
  }
}
