import { Product } from "./products";

export interface Discount {
  id: string;
  productId: string;
  product: Product;
  discountType: Discount_Type;
  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: Boolean;
  reason: string;
  createdAt: Date;
  updateAt: Date;
}

export enum Discount_Type {
  PERCENTAGE,
  FIXED_AMOUNT,
}
