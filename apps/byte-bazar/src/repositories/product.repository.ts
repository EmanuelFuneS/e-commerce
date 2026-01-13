import { Decimal, Prisma, prisma } from "@workspace/database";
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
      })
    ) as Serialized<T>;
  }

  async findMany(
    where?: Prisma.ProductWhereInput,
    pagination?: Prisma.ProductFindManyArgs,
    orderBy?: Prisma.ProductMinOrderByAggregateInput
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
    id: Prisma.ProductWhereUniqueInput
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

  async create(data: ProductsSchema): Promise<ProductWithRelations> {
    return await prisma.product.create({ ...data, tenantID: this.tenantID });
  }

  async update(
    id: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput
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

  async updateStock(
    id: Prisma.ProductWhereUniqueInput,
    quantity: number,
    typeMovement: string
  ) {
    //here need create stock movement
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
}
