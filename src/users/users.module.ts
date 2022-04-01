import { Module } from '@nestjs/common';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
