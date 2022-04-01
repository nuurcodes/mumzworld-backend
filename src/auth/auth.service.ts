import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'user/entities/user.entity';
import { UserService } from 'user/user.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from 'user/dto/input/create-user.input';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const passwordHashed = user.password;
    const isPasswordMatching = await compare(password, passwordHashed);

    return isPasswordMatching ? user : null;
  }

  async login(user: User, response: Response) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(payload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  async register(user: CreateUserInput): Promise<User> {
    const newUser = await this.userService.create({
      email: user.email,
      password: user.password,
      username: user.username,
    });

    return newUser;
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  // Used to get user from token outside normal authentication flow
  async verify(token: string): Promise<User> {
    const secret = this.configService.get('JWT_SECRET');
    const decoded = this.jwtService.verify(token, {
      secret,
    });

    const user = await this.userService.findOneByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get user from the decoded token.');
    }

    return user;
  }
}
