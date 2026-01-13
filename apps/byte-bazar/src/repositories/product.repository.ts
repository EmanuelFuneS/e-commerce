import { Prisma, prisma } from "@workspace/database";
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

export type ProductWithRelations = Prisma.ProductGetPayload<
  typeof productWithRelations
>;

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

  async findMany(
    where?: Prisma.ProductWhereInput,
    pagination?: Prisma.ProductFindManyArgs,
    orderBy?: Prisma.ProductMinOrderByAggregateInput
  ): Promise<ProductWithRelations[]> {
    return await prisma.product.findMany({
      where: {
        ...where,
        tenantID: this.tenantID,
      },
      orderBy,
      ...this.includeParams,
      ...pagination,
    });
  }

  async findById(
    id: Prisma.ProductWhereUniqueInput
  ): Promise<ProductWithRelations> {
    return await prisma.product.findUnique({
      where: {
        ...id,
        tenantID: this.tenantID,
      },
      ...this.includeParams,
    });
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
