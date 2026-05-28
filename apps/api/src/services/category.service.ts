import { CategoryRepository, Prisma } from "@workspace/repository";

export class CategoryService {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  async getCategories() {
    return await this.repository.findMany({});
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    return await this.repository.create(data);
  }

  async updateCategory(id: string, data: Prisma.CategoryUpdateInput) {
    return await this.repository.update({ id }, data);
  }

  async deleteCategory(id: string) {
    return await this.repository.delete({ id });
  }
}
