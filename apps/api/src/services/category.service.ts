import { CategoryRepository } from "@workspace/repository";
export class CategoryService {
  private repository: CategoryRepository;
  constructor() {
    this.repository = new CategoryRepository();
  }
  async getCategories() {
    return await this.repository.findMany({});
  }
}
