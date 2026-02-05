import { OrderItem, Prisma, prisma } from "@workspace/database";
import { ProductRepository } from "./product.repository";

export class OrderRepository {
  private readonly includeParams: Prisma.OrderFindManyArgs = {
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  };
  private readonly tenantID = process.env.TENANT_ID;

  async getOrders() {
    return prisma.order.findMany({
      where: {
        tenantID: this.tenantID,
      },
      ...this.includeParams,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getOrderByClient(userId: string) {
    return prisma.order.findMany({
      where: {
        userId,
        tenantID: this.tenantID,
      },
      ...this.includeParams,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: any, clientId: string) {
    const productRepo = new ProductRepository();

    const order = await prisma.order.create({
      ...data,
      items: {
        create: data.items.map((item: OrderItem) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    await productRepo.decreaseStockBatch(data.items, clientId, order.id);
    return order;
  }

  async cancelOrder(id: string) {
    //search stock movements and revert stock

    return prisma.order.update({
      where: {
        id,
      },
      data: {
        status: "cancelled",
      },
    });
  }
}
