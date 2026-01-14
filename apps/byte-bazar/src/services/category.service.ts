import { CategoryRepository } from "../repositories/category.repository";
export class CategoryService {
  private repository: CategoryRepository;
  constructor() {
    this.repository = new CategoryRepository();
  }
  async getCategories() {
    return await this.repository.findMany({});
  }
}
