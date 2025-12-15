interface Product {
  id?: string;
  name: string;
  description: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  brandId?: string;
  images?: string[];
  tags?: string[];
  isActive?: boolean;
  slug?: string;
  sku?: string;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
  brand?: {
    name: string;
  };
  category?: {
    name: string;
  };
  //for seed only
  brandName?: string;
  categoryName?: string;
}

export type { Product };
