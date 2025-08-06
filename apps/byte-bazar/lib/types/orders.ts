interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: object;
  billingAddress: object;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentId: string;
  orderItems: OrderItem[];

  createdAt: Date;
  updatedAt: Date;
  shippedAt: Date;
  deliverAt: Date;
}

export enum OrderStatus {
  PENDING,
  PAID,
  PROCESSING,
  SHIPPED,
  DELIVERED,
  CANCELLED,
  REFUNDED,
}
export type paymentMethod = "credit_card" | "paypal" | "bank_transfer";
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type { Order };
