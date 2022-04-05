import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
