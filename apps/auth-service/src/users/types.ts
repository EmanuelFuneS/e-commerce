import { Prisma } from '@workspace/database';

export const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    userRoles: {
      include: {
        role: true,
      },
    },
  },
});

export type User = Prisma.UserGetPayload<typeof userWithRelations>;

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
