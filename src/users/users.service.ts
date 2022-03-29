import { v4 as uuidv4 } from 'uuid';
import { User } from 'users/models/user';
import { Injectable } from '@nestjs/common';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const passwordInPlainText = createUserData.password;
    const passwordHashed = await hash(passwordInPlainText, 10);

    const user: User = {
      userId: uuidv4(),
      ...createUserData,
      password: passwordHashed,
    };

    this.users.push(user);

    const { userId, email, age, isSubscribed } = user;

    return {
      userId,
      email,
      age,
      isSubscribed,
    };
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );

    Object.assign(user, updateUserData);
    return user;
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userIds.map((userId) => this.getUser({ userId }));
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );
    const user = this.users[userIndex];
    this.users.splice(userIndex);
    return user;
  }
}
