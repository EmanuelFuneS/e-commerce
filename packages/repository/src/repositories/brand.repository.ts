import { prisma, Prisma } from "@workspace/database";
import { BrandSchema } from "../schemas/brand/brand.schema";
import { Brand } from "../types";
const brandWithRelations = Prisma.validator<Prisma.BrandDefaultArgs>()({
  include: {
    _count: {
      select: { products: true },
    },
  },
});

export type BrandWithRelations = Prisma.BrandGetPayload<
  typeof brandWithRelations
>;

export class BrandRepository {
  private tenantID = process.env.TENANT_ID;
  async find(
    where?: Prisma.BrandWhereInput,
    pagination?: Prisma.BrandFindManyArgs,
  ): Promise<Brand[]> {
    return await prisma.brand.findMany({
      where: {
        ...where,
        tenantID: this.tenantID,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
      ...pagination,
    });
  }
  async create(data: BrandSchema): Promise<Brand> {
    return await prisma.brand.create({
      data: { ...data, tenantID: this.tenantID },
    });
  }
  async update(id: string, data: BrandSchema): Promise<Brand> {
    console.log("DATA", data);
    return await prisma.brand.update({
      where: { id, tenantID: this.tenantID },
      data: {
        ...data,
      },
    });
  }
  async delete(id: Prisma.BrandWhereUniqueInput) {
    return await prisma.brand.delete({
      where: { ...id, tenantID: this.tenantID },
    });
  }
}
