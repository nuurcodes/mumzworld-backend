import { User } from 'user/entities/user.entity';
import { GetUserArgs } from 'user/dto/args/get-user.args';
import { UserService } from 'user/user.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'getAllUsers', nullable: true })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'getUserById', nullable: true })
  async findOne(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.userService.findOne(getUserArgs);
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserData);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async update(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(updateUserData, updateUserData.id);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async delete(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<User> {
    return this.userService.delete(deleteUserData);
  }
}
