import { Brand, prisma, Prisma } from "@workspace/database";
export class BrandRepository {
  private tenantID = process.env.TENANT_ID;
  async findMany(where?: Prisma.BrandWhereInput): Promise<Brand[]> {
    return await prisma.brand.findMany({
      where: {
        ...where,
        tenantID: this.tenantID,
      },
    });
  }
  async create(data: Prisma.BrandCreateInput): Promise<Brand> {
    return await prisma.brand.create({
      data: { ...data, tenantID: this.tenantID },
    });
  }
  async update(
    id: Prisma.BrandWhereUniqueInput,
    data: Prisma.BrandUpdateInput
  ): Promise<Brand> {
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
