import { Category, prisma, Prisma } from "@workspace/database";

export class CategoryRepository {
  private tenantID = process.env.TENANT_ID;
  async findMany(where?: Prisma.CategoryWhereInput): Promise<Category[]> {
    return await prisma.category.findMany({
      where: { ...where, tenantID: this.tenantID },
    });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return await prisma.category.create({
      data: { ...data, tenantID: this.tenantID },
    });
  }

  async update(
    id: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput
  ): Promise<Category> {
    return await prisma.category.update({
      where: {
        ...id,
        tenantID: this.tenantID,
      },
      data,
    });
  }

  async delete(
    id: Prisma.CategoryWhereUniqueInput
  ): Promise<Prisma.CategoryDefaultArgs> {
    return await prisma.category.delete({
      where: {
        ...id,
        tenantID: this.tenantID,
      },
    });
  }
}
