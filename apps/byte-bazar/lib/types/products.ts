import { OrderItem } from "./orders";
import { StockMovement } from "./stockMovement";

interface Product {
  id?: string;
  name: string;
  description: string;
  comparePrice?: number;
  price?: number;
  stock?: number;
  minStock?: number;
  categoryId?: string;
  brandId?: string;
  imageUrl?: string;
  images?: string[];
  tags?: string[];
  specification?: object;
  discountPercentage?: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  isActive?: boolean;
  isFeatured?: boolean;
  weight?: number;
  dimension?: number;
  slug?: string;
  sku?: string;
  views?: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
  orderItems?: OrderItem;
  stockMovements?: StockMovement;
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
