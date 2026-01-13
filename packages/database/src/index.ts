import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
  const logConfig: Array<"query" | "error" | "warn"> =
    process.env.NODE_ENV === "development"
      ? process.env.PRISMA_LOGS === "true"
        ? ["query", "error", "warn"]
        : ["error", "warn"]
      : ["error"];
  return new PrismaClient({
    log: logConfig,
  }).$extends(withAccelerate());
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

export type ExtendedPrismaClient = typeof prisma;

export async function disconnectPrisma() {
  await prisma.$disconnect();
}

export async function getConnectionInfo() {
  const result = await prisma.$queryRaw`
  SELECT count(*) as connections 
  FROM pg_stat_activity 
  WHERE dataname = current_database()
  `;
  return result;
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Helper safe operations
export async function safeDbOperation<T>(
  operations: () => Promise<T>,
  fallback: T
): Promise<T | null> {
  try {
    return await operations();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Can't reach database server")
    ) {
      console.warn("Database not available, returning fallback value");
      return fallback as T;
    }
    throw error;
  }
}

export { Prisma, PrismaClient } from "@prisma/client";
export { Decimal } from "@prisma/client/runtime/library";
