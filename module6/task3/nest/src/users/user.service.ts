import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    // Логіка збереження користувача
    return { message: 'User created successfully', user: createUserDto };
  }
}
