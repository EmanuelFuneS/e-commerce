import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Role, User } from '@workspace/database';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserRegister } from './types';

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

  async findByEmail(email: string) {
    const userFined = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                roleHasPermissions: {
                  include: {
                    rolePermission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return userFined;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    const roles = user.userRoles.map((ur) => ur.role.name);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: _, ...userWithOutPassword } = user;
    return {
      ...userWithOutPassword,
      roles: roles,
    };
  }

  async createWithDefaultRole(userRegister: UserRegister) {
    try {
      const existingUser = (await this.prisma.user.findUnique({
        where: { email: userRegister.email },
      })) as User;

      if (existingUser) {
        throw new ConflictException('User already exist');
      }

      const roleName = userRegister.roleName || 'user';
      const role: Role = await this.prisma.role.findUnique({
        where: { name: roleName },
      });

      if (!role) {
        throw new Error(`Role ${roleName} not found`);
      }

      const hashedPassword: string = await bcrypt.hash(
        userRegister.password,
        10,
      );

      const user = (await this.prisma.user.create({
        data: {
          email: userRegister.email,
          password: hashedPassword,
          name: userRegister.name,
          userRoles: {
            create: {
              roleId: role.id,
            },
          },
        },
        include: {
          userRoles: {
            include: {
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      })) as User;

      const { password, ...userWithoutPassword } = user;
      const roles = user.userRoles.map((ur) => ur.role.name);
      return {
        ...userWithoutPassword,
        roles,
      };
    } catch (error) {
      console.error(`Failed to Create User: ${error}`);
    }
  }
}
