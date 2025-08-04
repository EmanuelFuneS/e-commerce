interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  paymentMethod?: "credit_card" | "paypal" | "bank_transfer"; // Optional field for payment method
}

interface OrderItem {
  productId: string;
  quantity: number;
}

export type { Order };
export type OrderStatus = Order["status"];
