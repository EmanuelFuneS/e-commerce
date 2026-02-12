import { z } from "zod";

export const productsSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  brandId: z.string().min(1, { message: "Brand is required" }),
  stock: z.number().int().nonnegative({
    message: "Stock must be a non-negative integer",
  }),

  images: z
    .array(z.string().url({ message: "Image URL must be valid" }))
    .default([]),

  isActive: z.boolean().default(true),

  sku: z.string().min(1, { message: "SKU is required" }), // Generado: categoryId + brandId + timestamp o random
  tags: z
    .array(z.string().min(1, { message: "Tag cannot be empty" }))
    .default([]), // Generados: desde name, description, category
  slug: z.string(), // Generado: desde name (ej: "Product Name" -> "product-name")
  views: z.number().default(0), // Inicializado en 0
});

export type ProductsSchema = z.infer<typeof productsSchema>;
