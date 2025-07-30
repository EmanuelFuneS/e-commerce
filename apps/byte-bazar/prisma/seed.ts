import { Prisma, PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Test",
    email: "test@gmail.com",
  },
  {
    name: "Test2",
    email: "test2@gmail.com",
  },
  {
    name: "Test3",
    email: "test3@gmail.com",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
