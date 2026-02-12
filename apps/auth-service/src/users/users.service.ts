import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma, Role } from '@workspace/database';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserRegister, UserRole } from './types';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: {
      password?: string;
      isVerified?: boolean;
      resetPasswordToken?: string;
      resetPasswordExpires?: Date;
      updatedAt: Date;
    },
  ) {
    return (await this.prismaService.client.user.update({
      where: { ...where },
      data: {
        ...data,
      },
    })) as User;
  }

  async findByEmail(email: string) {
    const userFound = (await this.prismaService.client.user.findUnique({
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
    })) as User;
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    const roles = userFound.userRoles.map((ur: UserRole) => ur.role.name);

    return { ...userFound, roles: roles };
  }

  async findById(id: string) {
    const userFound = (await this.prismaService.client.user.findUnique({
      where: { id: id },
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
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    const roles = userFound.userRoles.map((ur: UserRole) => ur.role.name);

    return {
      ...userFound,
      roles: roles,
    };
  }

  async findUserByToken(token: string) {
    return (await this.prismaService.client.user.findUnique({
      where: { resetPasswordToken: token },
    })) as User;
  }

  async createWithDefaultRole(userRegister: UserRegister) {
    try {
      const existingUser = (await this.prismaService.client.user.findUnique({
        where: { email: userRegister.email },
      })) as User;

      if (existingUser) {
        throw new ConflictException('User already exist');
      }

      const roleName = userRegister.roleName || 'customer';
      const role: Role = await this.prismaService.client.role.findUnique({
        where: { name: roleName },
      });

      if (!role) {
        throw new Error(`Role ${roleName} not found`);
      }

      const hashedPassword: string = await bcrypt.hash(
        userRegister.password,
        10,
      );

      const user = (await this.prismaService.client.user.create({
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

      const roles = user.userRoles.map((ur: UserRole) => ur.role.name);
      return {
        ...userWithoutPassword,
        roles,
      };
    } catch (error) {
      console.error(`Failed to Create User: ${error}`);
    }
  }
}
