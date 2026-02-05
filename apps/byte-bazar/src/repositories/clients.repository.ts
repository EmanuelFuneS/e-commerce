import { prisma } from "@workspace/database";

export class UserRepository {
  async getClient() {
    return await prisma.users.findMany({
      where: { role: "client" },
    });
  }

  async getClientById(id: string) {
    return await prisma.users.findUnique({
      where: { id },
    });
  }
}
