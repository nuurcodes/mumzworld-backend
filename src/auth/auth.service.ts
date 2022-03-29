import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'users/models/user.model';
import { UsersService } from 'users/users.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from 'users/dto/input/create-user.input';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUserByEmail(email);

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
      sub: user._id,
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
    const newUser = await this.usersService.createUser({
      email: user.email,
      password: user.password,
      username: user.username,
    });

    return newUser;
  }

  // Used to get user from token outside normal authentication flow
  async verify(token: string): Promise<User> {
    const secret = this.configService.get('JWT_SECRET');
    const decoded = this.jwtService.verify(token, {
      secret,
    });

    const user = await this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get user from the decoded token.');
    }

    return user;
  }
}
