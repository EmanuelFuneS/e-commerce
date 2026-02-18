import { BrandSchema } from "../../lib/schemas/brand/brand.schema";
import { BrandRepository } from "../repositories/brand.repository";

export class BrandService {
  private brandRepository: BrandRepository;
  constructor() {
    this.brandRepository = new BrandRepository();
  }

  async getBrands() {
    return await this.brandRepository.find();
  }

  async getBrandById(id: string) {
    return await this.brandRepository.find({ id });
  }

  async createBrand(data: any) {
    return await this.brandRepository.create(data);
  }

  async updateBrand(data: BrandSchema) {
    const { id, ...brand } = data;
    if (!id) throw new Error("ID is required");
    return await this.brandRepository.update(id, brand);
  }
}
