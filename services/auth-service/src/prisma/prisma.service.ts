import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { prisma, type Role, type RolePermission } from '@workspace/database';

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
    // Con Accelerate, normalmente NO necesitas $connect manual
    // porque usa conexión pool vía HTTP. Pero si quieres mantenerlo:
    // await this.client.$connect();
    console.log('Prisma Client ready (with Accelerate)');
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  private async seed() {
    try {
      console.log('🌱 Checking seed data...');

      const userRole = (await this.client.role.upsert({
        where: { name: 'user' },
        update: {},
        create: {
          name: 'user',
        },
      })) as Role;

      const adminRole = (await this.client.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
          name: 'admin',
        },
      })) as Role;

      const moderatorRole = (await this.client.role.upsert({
        where: { name: 'moderator' },
        update: {},
        create: {
          name: 'moderator',
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

      const userPermissions = createdPermissions.filter(
        (p) => p.action === 'read',
      );
      for (const permission of userPermissions) {
        await this.client.roleHasPermission.upsert({
          where: {
            roleId_rolePermissionId: {
              roleId: userRole.id,
              rolePermissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: userRole.id,
            rolePermissionId: permission.id,
          },
        });
      }

      const moderatorPermissions = createdPermissions.filter(
        (p) =>
          p.action === 'read' ||
          (p.action === 'create' && p.subject !== 'users') ||
          (p.action === 'update' && p.subject !== 'users'),
      );
      for (const permission of moderatorPermissions) {
        await this.client.roleHasPermission.upsert({
          where: {
            roleId_rolePermissionId: {
              roleId: moderatorRole.id,
              rolePermissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: moderatorRole.id,
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

      console.log('✅ Seed data checked/created successfully');
    } catch (error) {
      console.error('❌ Seed error:', error);
    }
  }
}
