import { User } from 'users/models/user.model';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { UsersRepository } from './users.repository';
import { UserDocument } from './models/user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserData: CreateUserInput) {
    await this.validateCreateUserData(createUserData);

    const passwordInPlainText = createUserData.password;
    const passwordHashed = await hash(passwordInPlainText, 10);

    const userDocument = await this.usersRepository.create({
      ...createUserData,
      password: passwordHashed,
    });

    return this.toModel(userDocument);
  }

  async updateUser(
    updateUserData: UpdateUserInput,
    userId: string,
  ): Promise<User> {
    const userDocument = await this.usersRepository.findOneAndUpdate(
      { _id: userId },
      updateUserData,
    );
    return this.toModel(Object.assign(userDocument, updateUserData));
  }

  async getUserByEmail(email: string): Promise<User> {
    const userDocument = await this.usersRepository.findOne({ email });
    return this.toModel(userDocument, { includePassword: true });
  }

  async getUser(getUserArgs: GetUserArgs): Promise<User> {
    const userDocument = await this.usersRepository.findOne(getUserArgs);
    return this.toModel(userDocument);
  }

  async getUsers(getUsersArgs: GetUsersArgs): Promise<User[]> {
    const usersDocument = await this.usersRepository.find({
      _id: { $in: getUsersArgs.userIds },
    });
    return usersDocument.map((doc) => this.toModel(doc));
  }

  async deleteUser(deleteUserData: DeleteUserInput): Promise<User> {
    const userDocument = await this.usersRepository.delete({
      _id: deleteUserData.userId,
    });
    return this.toModel(userDocument);
  }

  private async validateCreateUserData(createUserData: CreateUserInput) {
    try {
      await this.usersRepository.findOne({
        email: createUserData.email,
      });
      throw new UnprocessableEntityException('Email already exists');
    } catch (err) {
      if (err instanceof UnprocessableEntityException) {
        throw err;
      }
    }
  }

  private toModel(
    userDocument: UserDocument,
    options?: { includePassword: boolean },
  ): User {
    return {
      _id: userDocument._id.toHexString(),
      email: userDocument.email,
      username: userDocument.username,
      ...(options &&
        options.includePassword && {
          password: userDocument.password,
        }),
    };
  }
}
