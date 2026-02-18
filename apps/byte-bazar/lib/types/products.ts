import { ProductWithRelationsSerialized } from "../../src/repositories/product.repository";

interface Product extends ProductWithRelationsSerialized {
  finalPrice: number;
}

export interface ProductResponse {
  success: boolean;
  products: Product[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

export type { Product };
