import zod from "zod";

const productsSchema = zod.object({
  name: zod.string().min(1, { message: "Product name is required" }),
  description: zod.string().min(1, { message: "Description is required" }),
  price: zod.number().positive({ message: "Price must be a positive number" }),
  category: zod.string().min(1, { message: "Category is required" }),
  brand: zod.string().min(1, { message: "Brand is required" }),
  imageUrl: zod.string().url({ message: "Image URL must be a valid URL" }),

  stock: zod
    .number()
    .int({ message: "Stock must be an integer" })
    .nonnegative({ message: "Stock cannot be negative" }),
});
export default productsSchema;

export type { zod as ZodType };
export type ProductsSchema = zod.infer<typeof productsSchema>;
