import { BrandSchema, BrandFilters  } from "@workspace/repository";
import { BrandRepository } from "@workspace/repository";

export class BrandService {
  private brandRepository: BrandRepository;
  constructor() {
    this.brandRepository = new BrandRepository();
  }

  async getBrands(
    filters?: BrandFilters,
    pagination?: { page?: number; pageSize?: number },
  ) {
    const whereClause: Record<string, unknown> = {};
    if (filters) {
      if (filters.name) {
        whereClause.name = filters.name;
      }
      if (filters.tenantId) {
        whereClause.tenantID = filters.tenantId;
      }
    }
    const { page, pageSize } = pagination ?? {};
    let paginationObj = {};

    if (page && pageSize) {
      const hasPagination =
        Number.isInteger(page) &&
        Number.isInteger(pageSize) &&
        page! > 0 &&
        pageSize! > 0;
      if (hasPagination) {
        paginationObj = {
          skip: page! * pageSize!,
          take: pageSize!,
        };
      }
    }

    return await this.brandRepository.find(whereClause, paginationObj);
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
