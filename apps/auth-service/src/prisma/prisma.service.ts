import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { prisma, type Role, type RolePermission } from '@workspace/database';
import bcrypt from 'bcrypt';

@Injectable()
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly client;

  constructor() {
    this.client = prisma;
  }

  private basePermissions: Array<{ action: string; subject: string }> = [
    { action: 'create', subject: 'users' },
    { action: 'read', subject: 'users' },
    { action: 'update', subject: 'users' },
    { action: 'delete', subject: 'users' },
    { action: 'create', subject: 'products' },
    { action: 'read', subject: 'products' },
    { action: 'update', subject: 'products' },
    { action: 'delete', subject: 'products' },
    { action: 'create', subject: 'orders' },
    { action: 'read', subject: 'orders' },
    { action: 'update', subject: 'orders' },
    { action: 'delete', subject: 'orders' },
  ];

  onModuleInit() {
    console.log('Prisma Client ready (with Accelerate)');
    /* this.seed(); */
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  private async seed() {
    try {
      console.log('🌱 Checking seed data...');

      const customerRole = (await this.client.role.upsert({
        where: { name: 'customer' },
        update: {},
        create: {
          name: 'customer',
        },
      })) as Role;

      const adminRole = (await this.client.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
          name: 'admin',
        },
      })) as Role;

      const superAdminRole = (await this.client.role.upsert({
        where: { name: 'super-admin' },
        update: {},
        create: {
          name: 'super-admin',
        },
      })) as Role;

      const createdPermissions: Array<any> = [];
      for (const perm of this.basePermissions) {
        const permission: RolePermission = await prisma.rolePermission.upsert({
          where: {
            action_subject: {
              action: perm.action,
              subject: perm.subject,
            },
          },
          update: {},
          create: perm,
        });
        createdPermissions.push(permission);
      }

      const customerPermissions = createdPermissions.filter(
        (p) => p.action === 'read',
      );
      for (const permission of customerPermissions) {
        await this.client.roleHasPermission.upsert({
          where: {
            roleId_rolePermissionId: {
              roleId: customerRole.id,
              rolePermissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: customerRole.id,
            rolePermissionId: permission.id,
          },
        });
      }

      const superAdminPermissions = createdPermissions.filter(
        (p) =>
          p.action === 'read' ||
          (p.action === 'create' && p.subject !== 'users') ||
          (p.action === 'update' && p.subject !== 'users'),
      );
      for (const permission of superAdminPermissions) {
        await this.client.roleHasPermission.upsert({
          where: {
            roleId_rolePermissionId: {
              roleId: superAdminRole.id,
              rolePermissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: superAdminRole.id,
            rolePermissionId: permission.id,
          },
        });
      }

      for (const permission of createdPermissions) {
        await this.client.roleHasPermission.upsert({
          where: {
            roleId_rolePermissionId: {
              roleId: adminRole.id,
              rolePermissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: adminRole.id,
            rolePermissionId: permission.id,
          },
        });
      }
      const defaultAdminEmail = 'admin@example.com';
      const defaultSuperAdminEmail = 'super-admin@example.com';

      const adminPassword: string = await bcrypt.hash('admin123', 10);
      await this.client.user.upsert({
        where: { email: defaultAdminEmail },
        update: {},
        create: {
          email: defaultAdminEmail,
          password: adminPassword,
          name: 'Default Admin',
          userRoles: {
            create: {
              roleId: adminRole.id,
            },
          },
        },
      });

      const superAdminPassword: string = await bcrypt.hash(
        'super-admin123',
        10,
      );
      await this.client.user.upsert({
        where: { email: defaultSuperAdminEmail },
        update: {},
        create: {
          email: defaultSuperAdminEmail,
          password: superAdminPassword,
          name: 'Default Super Admin',
          userRoles: {
            create: {
              roleId: superAdminRole.id,
            },
          },
        },
      });

      console.log('✅ Seed data checked/created successfully');
    } catch (error) {
      console.error('❌ Seed error:', error);
    }
  }
}
