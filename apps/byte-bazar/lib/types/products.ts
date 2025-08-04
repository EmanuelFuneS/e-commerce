interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;

  stock: number; // Stock quantity available for the product
}

export type { Product };
export type ProductCategory = Product["category"];
