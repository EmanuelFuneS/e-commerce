import { Prisma } from '@workspace/database';

export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  isActive: boolean;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin: Date;
  loginAttempts: number;
  lockUntil: Date;
  createdAt: Date;
  updateAt: Date;
  //relations
  userRoles: UserRole[];
  refreshToken: any;
  orders: any;
  stockMovements?: any;
  couponUsages: any;
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
}

export interface Role {
  id: string;
  name: string;
}

export type UserWithRoles = Prisma.UserGetPayload<{
  include: {
    userRoles: {
      include: {
        role: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
  };
}>;
export type UserWithoutPassword = Omit<
  Prisma.UserGetPayload<{
    include: {
      userRoles: {
        include: {
          role: {
            select: {
              id: true;
              name: true;
            };
          };
        };
      };
    };
  }>,
  'password'
>;
export type UserWithRoles_Permission = Prisma.UserGetPayload<{
  include: {
    userRoles: {
      include: {
        role: {
          include: {
            roleHasPermissions: {
              include: {
                rolePermission: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  roleName: string;
}
