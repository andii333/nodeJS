import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, username: 'john', password: '1234' },
    { id: 2, username: 'maria', password: 'guess' },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
