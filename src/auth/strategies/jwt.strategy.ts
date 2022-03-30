import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'users/users.service';
import { User } from 'users/models/user.model';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(validationPayload: {
    email: string;
    sub: string;
  }): Promise<User | null> {
    return this.userService.getUserByEmail(validationPayload.email);
  }
}
