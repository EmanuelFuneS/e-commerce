import { z } from "zod";

export const discountSchema = z.object({
  id: z.string(),
  productId: z.string(), // FK a products

  // Descuento
  discountType: z.enum(["percentage", "fixed_amount"]),
  discountValue: z.number().positive(),

  // Período
  startDate: z.date(),
  endDate: z.date(),

  // Estado
  isActive: z.boolean().default(true),
  reason: z.string().optional(), // "Black Friday", "Clearance", etc.

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DiscountSchema = z.infer<typeof discountSchema>;
