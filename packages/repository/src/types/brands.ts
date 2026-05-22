import { BrandWithRelations } from "../../src/repositories/brand.repository";

interface Brand extends BrandWithRelations {}

export type { Brand };

export interface BrandFilters {
  name?: string;
  tenantId?: string;
}
