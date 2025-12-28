import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/require-await
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(user) {
    return await this.prisma.client.user.create({
      data: user,
    });
  }
}
