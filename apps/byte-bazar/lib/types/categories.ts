import { Product } from "./products";

interface Category {
  id?: string;
  name?: string;
  description?: string;
  slug?: string;
  parentId?: string;
  imageUrl?: string;
  logo?: string;
  isActive?: boolean;
  sortOrder?: number;
  createAt?: Date;
  updateAt?: Date;
  products?: Product[];
}

export type { Category };
