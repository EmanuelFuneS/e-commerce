import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../app/generated/prisma";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

export async function safeDbOperation<T>(
  operations: () => Promise<T>,
  fallback?: T
): Promise<T | null> {
  try {
    return await operations();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Can't reach database server")
    ) {
      console.warn("Database not available, returning fallback value");
      return fallback ?? null;
    }
    throw error;
  }
}
