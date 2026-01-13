import { prisma, Prisma } from "@workspace/database";
export class BrandRepository {
  private tenantID = process.env.TENANT_ID;
  async findMany(): Promise<Prisma.BrandDefaultArgs[]> {
    return await prisma.brand.findMany({
      where: {
        tenantID: this.tenantID,
      },
    });
  }
  async create(
    data: Prisma.BrandCreateInput
  ): Promise<Prisma.BrandDefaultArgs> {
    return await prisma.brand.create({
      data: { ...data, tenantID: this.tenantID },
    });
  }
  async update(
    id: Prisma.BrandWhereUniqueInput,
    data: Prisma.BrandUpdateInput
  ): Promise<Prisma.BrandDefaultArgs> {
    return await prisma.brand.update({
      where: { ...id, tenantID: this.tenantID },
      data,
    });
  }
  async delete(id: Prisma.BrandWhereUniqueInput) {
    return await prisma.brand.delete({
      where: { ...id, tenantID: this.tenantID },
    });
  }
}
