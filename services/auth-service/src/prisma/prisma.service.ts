import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { prisma } from '@workspace/database';
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  get client() {
    return prisma;
  }

  async onModuleInit() {
    await prisma.$connect();
    console.log('Database connected');
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
    console.log('Database disconnected');
  }
}
