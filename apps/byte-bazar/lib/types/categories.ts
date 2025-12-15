import { Product } from "./products";

interface Category {
  id?: string;
  name?: string;
  imageUrl?: string;
  createAt?: Date;
  updateAt?: Date;
  products?: Product[];
}

export type { Category };
