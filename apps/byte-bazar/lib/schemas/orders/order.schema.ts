import zod from "zod";

const orderSchema = zod.object({
  userId: zod.string().uuid({ message: "Invalid user ID" }),
  items: zod.array(
    zod.object({
      productId: zod.string().uuid({ message: "Invalid product ID" }),
      quantity: zod.number().min(1, { message: "Quantity must be at least 1" }),
    })
  ),
  totalAmount: zod
    .number()
    .min(0, { message: "Total amount must be a positive number" }),
  status: zod.enum(["pending", "completed", "cancelled"], {
    message: "Status must be one of 'pending', 'completed', or 'cancelled'",
  }),
});

export default orderSchema;
export type { zod as ZodType };
export type OrderSchema = zod.infer<typeof orderSchema>;
