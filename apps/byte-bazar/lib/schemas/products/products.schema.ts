import zod from "zod";

const productsSchema = zod.object({
  name: zod.string().min(1, { message: "Product name is required" }),
  description: zod.string().min(1, { message: "Description is required" }),
  sku: zod.string().min(1, { message: "SKU is required" }),
  price: zod.number().positive({ message: "Price must be a positive number" }),
  comparePrice: zod.number(),
  stock: zod.number().int().nonnegative({
    message: "Stock must be a non-negative integer",
  }),
  minStock: zod.number().int().nonnegative({
    message: "Minimum stock must be a non-negative integer",
  }),

  categoryId: zod.string().min(1, { message: "Category is required" }),
  brandId: zod.string().min(1, { message: "Brand is required" }),
  imageUrl: zod.string().url({ message: "Image URL must be a valid URL" }),
  images: zod.array(zod.string().url({ message: "Image URL must be valid" })),
  tags: zod.array(zod.string().min(1, { message: "Tag cannot be empty" })),

  discountPercentage: zod.number(),
  discountStartDate: zod.date(),
  discountEndDate: zod.date(),

  isActive: zod.boolean(),
  isFeatured: zod.boolean(),
  Weight: zod.number(),
  dimensions: zod.object({
    length: zod.number(),
    width: zod.number(),
    height: zod.number(),
  }),
  slug: zod.string(),
  Views: zod.number().default(0),
  metaTitle: zod.string(),
  metaDescription: zod.string(),
});
export default productsSchema;

export type { zod as ZodType };
export type ProductsSchema = zod.infer<typeof productsSchema>;
