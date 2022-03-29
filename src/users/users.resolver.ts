import { User } from 'users/models/user.model';
import { GetUserArgs } from 'users/dto/args/get-user.args';
import { UsersService } from 'users/users.service';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    const user = await this.usersService.getUser(getUserArgs);
    return user;
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
    const users = await this.usersService.getUsers(getUsersArgs);
    return users;
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    const newUser = await this.usersService.createUser(createUserData);
    return newUser;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    const user = this.usersService.updateUser(
      updateUserData,
      updateUserData.userId,
    );
    return user;
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    const user = this.usersService.deleteUser(deleteUserData);
    return user;
  }
}
