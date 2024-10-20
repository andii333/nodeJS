import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  users: string[] = [];
  async createUser(createUserDto: CreateUserDto) {
    if (this.users.includes(createUserDto.username))
      return { message: `User with ${createUserDto.username} exists` };
    else {
      this.users.push(createUserDto.username);
      return { message: 'User created successfully', user: createUserDto };
    }
  }
}
