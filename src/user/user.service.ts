import { User } from 'user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { GetUserArgs } from './dto/args/get-user.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserData: CreateUserInput): Promise<User> {
    const passwordInPlainText = createUserData.password;
    const passwordHashed = await hash(passwordInPlainText, 10);

    return this.userRepository.save({
      ...createUserData,
      password: passwordHashed,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['posts', 'comments', 'likes'],
    });
  }

  async findOne(getUserArgs: GetUserArgs): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: getUserArgs.id },
      relations: ['posts', 'comments', 'likes'],
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['posts', 'comments', 'likes'],
    });
  }

  async update(updateUserData: UpdateUserInput, id: string): Promise<User> {
    await this.userRepository.update(id, updateUserData);
    return this.findOne({ id });
  }

  async delete(deleteUserData: DeleteUserInput): Promise<User> {
    const user = await this.findOne({ id: deleteUserData.id });
    await this.userRepository.delete(deleteUserData.id);
    return user;
  }
}
