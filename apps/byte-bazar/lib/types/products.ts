import { ProductWithRelations } from "../../src/repositories/product.repository";

interface Product extends ProductWithRelations {
  finalPrice: number;
}

export type { Product };
