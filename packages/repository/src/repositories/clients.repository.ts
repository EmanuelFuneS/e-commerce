import { Prisma, prisma } from "@workspace/database";

const clientsWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    shippingAddress: true,
    userRoles: {
      include: {
        role: true,
      },
    },
    orders: true,
    paymentMethods: true,
  },
});

export type ClientWithRelations = Prisma.UserGetPayload<
  typeof clientsWithRelations
>;

export class UserRepository {
  //private tenantID = process.env.TENANT_ID;
  private includeParams: Prisma.UserInclude = {
    shippingAddress: true,
    userRoles: true,
    orders: true,
    paymentMethods: true,
  };
  async getClient() {
    return await prisma.user.findMany({
      where: {
        userRoles: {
          some: {
            role: {
              name: "user",
            },
          },
        },
      },
      include: this.includeParams,
    });
  }

  async getClientById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: this.includeParams,
    });
  }
}
