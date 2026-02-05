import {
  Decimal,
  DiscountType,
  OrderItem,
  Prisma,
  prisma,
  StockMovementType,
} from "@workspace/database";
import { ProductsSchema } from "../../lib/schemas/products/products.schema";

const productWithRelations = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    category: true,
    brand: true,
    discounts: {
      where: { isActive: true },
    },
  },
});

type Serialized<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends Date | null
      ? string | null
      : T[K] extends Decimal
        ? string
        : T[K] extends Decimal | null
          ? string | null
          : T[K] extends (infer U)[]
            ? Serialized<U>[]
            : T[K] extends object | null
              ? Serialized<T[K]>
              : T[K];
};
export type ProductWithRelations = Prisma.ProductGetPayload<
  typeof productWithRelations
>;

export type ProductWithRelationsSerialized = Serialized<ProductWithRelations>;

export class ProductRepository {
  private includeParams: Prisma.ProductInclude = {
    category: true,
    brand: true,
    discounts: {
      where: { isActive: true },
      take: 1,
    },
  };
  private tenantID = process.env.TENANT_ID;

  private serializeData<T>(obj: T): Serialized<T> {
    return JSON.parse(
      JSON.stringify(obj, (key, value) => {
        // Decimal
        if (value?.constructor?.name === "Decimal") {
          return value.toString();
        }
        // Date
        if (value instanceof Date) {
          return value.toISOString();
        }
        // BigInt
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      }),
    ) as Serialized<T>;
  }

  async findMany(
    where?: Prisma.ProductWhereInput,
    pagination?: Prisma.ProductFindManyArgs,
    orderBy?: Prisma.ProductMinOrderByAggregateInput,
  ): Promise<ProductWithRelationsSerialized[]> {
    const products = await prisma.product.findMany({
      where: {
        ...where,
        tenantID: this.tenantID,
      },
      orderBy: {
        ...orderBy,
      },
      include: this.includeParams,
      ...pagination,
    });
    return products && this.serializeData(products);
  }

  async findById(
    id: Prisma.ProductWhereUniqueInput,
  ): Promise<ProductWithRelationsSerialized> {
    const product = await prisma.product.findUnique({
      where: {
        ...id,
        tenantID: this.tenantID,
      },
      include: this.includeParams,
    });
    return product && this.serializeData(product);
  }

  /*   async findByTenant(
    tenantId: Prisma.ProductWhereUniqueInput
  ): Promise<ProductWithRelations[]> {
    return await prisma.product.findMany({
      where: {
        tenantId: tenantId,
      },
      ...this.includeParams,
    });
  } */

  async create(
    data: ProductsSchema,
    adminId: string,
  ): Promise<ProductWithRelations> {
    const newProduct = await prisma.product.create({
      ...data,
      tenantID: this.tenantID,
    });

    if (!newProduct) {
      throw new Error("Product not created");
    }

    await prisma.stockMovement.create({
      productId: newProduct.id,
      typeMovement: StockMovementType.IN,
      quantity: data.stock,
      reason: "Initial stock",
      reference: "PO-2024-001",
      userId: adminId,
      tenantID: this.tenantID,
    });

    return newProduct;
  }

  async update(
    id: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<ProductWithRelations> {
    return await prisma.product.update({
      where: { ...id, tenantID: this.tenantID },
      data,
    });
  }

  async delete(id: Prisma.ProductWhereUniqueInput) {
    return await prisma.product.delete({
      where: { ...id, tenantID: this.tenantID },
    });
  }

  async incrementViews(id: Prisma.ProductWhereUniqueInput) {
    return await prisma.product.update({
      where: { id, tenantID: this.tenantID },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  async incrementStock(
    id: Prisma.ProductWhereUniqueInput,
    quantity: number,
    adminId: string,
  ) {
    await prisma.stockMovement.create({
      data: {
        productId: id,
        typeMovement: StockMovementType.ADJUST,
        quantity: quantity,
        reason: "Re stock",
        reference: "PO-2024-001",
        tenantID: this.tenantID,
        userId: adminId,
      },
    });

    return await prisma.product.update({
      where: {
        id,
        tenantID: this.tenantID,
      },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  }

  async decreaseStockBatch(
    data: OrderItem[],
    adminId: string,
    orderId: string,
  ) {
    if (!data || data.length === 0) {
      throw new Error("No items found");
    }

    return await prisma.$transaction(async (tx) => {
      const updates = await Promise.all(
        data.map(async (item) => {
          const product = await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });

          await tx.stockMovement.create({
            data: {
              productId: product.id,
              typeMovement: StockMovementType.OUT,
              quantity: item.quantity,
              reason: "Sold out",
              reference: `ORDER-${orderId}`,
              userId: adminId,
              tenantID: this.tenantID,
            },
          });
          return product;
        }),
      );
      return updates;
    });
  }

  async applyDiscount(
    productId: string,
    type: DiscountType,
    reason: string,
    startDate: Date,
    endDate: Date,
  ) {
    return await prisma.discount.create({
      data: {
        productId,
        discountType: DiscountType[type],
        discountValue: 10,
        startDate: startDate,
        endDate: endDate,
        isActive: true,
        reason: reason,
      },
    });
  }

  async disableDiscount(id: string) {
    return await prisma.discount.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
