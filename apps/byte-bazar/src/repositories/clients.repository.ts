import { Prisma, prisma } from "@workspace/database";

export class UserRepository {
  private tenantID = process.env.TENANT_ID;
  private includeParams: Prisma.UserInclude = {
    shippingAddress: true,
  };
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
