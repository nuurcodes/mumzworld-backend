import { User } from 'users/models/user.entity';
import { GetUserArgs } from 'users/dto/args/get-user.args';
import { UsersService } from 'users/users.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'getAllUsers', nullable: true })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'getUserById', nullable: true })
  async findOne(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.findOne(getUserArgs);
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserData);
  }

  @Mutation(() => User)
  async update(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserData, updateUserData.id);
  }

  @Mutation(() => User)
  async delete(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    return this.usersService.delete(deleteUserData);
  }
}
