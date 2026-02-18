import z from "zod";

export const cartItemSchema = z.object({
  productId: z.string(),
  price: z.string(),
  quantity: z.number().min(1),
});

export const cartProductsSchema = z.object({
  items: z.array(cartItemSchema),
  subtotal: z.string(),
});

export type CartProduct = z.infer<typeof cartItemSchema>;
export type CartProducts = z.infer<typeof cartProductsSchema>;
