import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  prisma,
  type ExtendedPrismaClient,
  type Role,
  type RolePermission,
} from '@workspace/database';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
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
  get client(): ExtendedPrismaClient {
    return prisma;
  }

  async onModuleInit() {
    await this.client.$connect();
    console.log('Database connected');
    //await this.seed();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    console.log('Database disconnected');
  }

  private async seed() {
    try {
      console.log('🌱 Checking seed data...');

      // Crear roles por defecto
      const userRole: Role = await this.client.role.upsert({
        where: { name: 'user' },
        update: {},
        create: {
          name: 'user',
        },
      });

      const adminRole: Role = await this.client.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
          name: 'admin',
        },
      });

      const moderatorRole: Role = await this.client.role.upsert({
        where: { name: 'moderator' },
        update: {},
        create: {
          name: 'moderator',
        },
      });

      // Crear permisos

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

      // Asignar permisos a roles

      // Usuario: solo lectura
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

      // Moderador: lectura, crear y actualizar productos/órdenes
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

      // Admin: todos los permisos
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
      // No lanzar error para que la app siga funcionando
    }
  }
}
