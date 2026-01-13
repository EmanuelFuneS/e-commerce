import { BrandRepository } from "../repositories/brand.repository";

export class BrandService {
  private brandRepository: BrandRepository;
  constructor() {
    this.brandRepository = new BrandRepository();
  }

  async getBrands() {
    return await this.brandRepository.findMany();
  }
}
