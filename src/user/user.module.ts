import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { UsersController } from '@user/user.controller';
import { UserResolver } from '@user/user.resolver';
import { UserService } from '@user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
