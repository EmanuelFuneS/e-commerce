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

export const ordersExample: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-2024-001",
    userId: "user-123",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "+1-555-0123",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    billingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    subtotal: 299.97,
    shippingCost: 15.0,
    taxAmount: 26.25,
    discountAmount: 0,
    status: OrderStatus.DELIVERED,
    paymentMethod: "credit_card",
    paymentId: "pay_1234567890",
    orderItems: [
      {
        id: "item-001",
        orderId: "ord-001",
        productId: "prod-101",
        quantity: 2,
        unitPrice: 99.99,
      },
      {
        id: "item-002",
        orderId: "ord-001",
        productId: "prod-102",
        quantity: 1,
        unitPrice: 99.99,
      },
    ],
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-20T14:20:00Z"),
    shippedAt: new Date("2024-01-17T08:00:00Z"),
    deliverAt: new Date("2024-01-20T14:20:00Z"),
  },
  {
    id: "ord-002",
    orderNumber: "ORD-2024-002",
    userId: "user-456",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    customerPhone: "+1-555-0456",
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    billingAddress: {
      street: "789 Pine Rd",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90002",
      country: "USA",
    },
    subtotal: 149.99,
    shippingCost: 10.0,
    taxAmount: 14.0,
    discountAmount: 15.0,
    status: OrderStatus.SHIPPED,
    paymentMethod: "paypal",
    paymentId: "PAYPAL-98765432",
    orderItems: [
      {
        id: "item-003",
        orderId: "ord-002",
        productId: "prod-103",
        quantity: 1,
        unitPrice: 149.99,
      },
    ],
    createdAt: new Date("2024-01-18T14:15:00Z"),
    updatedAt: new Date("2024-01-22T09:30:00Z"),
    shippedAt: new Date("2024-01-22T09:30:00Z"),
    deliverAt: new Date("2024-01-25T16:00:00Z"),
  },
  {
    id: "ord-003",
    orderNumber: "ORD-2024-003",
    userId: "user-789",
    customerName: "Robert Johnson",
    customerEmail: "robert.j@example.com",
    customerPhone: "+1-555-0789",
    shippingAddress: {
      street: "789 Elm St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
    },
    billingAddress: {
      street: "789 Elm St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
    },
    subtotal: 449.95,
    shippingCost: 20.0,
    taxAmount: 40.5,
    discountAmount: 50.0,
    status: OrderStatus.PROCESSING,
    paymentMethod: "credit_card",
    paymentId: "pay_0987654321",
    orderItems: [
      {
        id: "item-004",
        orderId: "ord-003",
        productId: "prod-104",
        quantity: 3,
        unitPrice: 149.99,
      },
      {
        id: "item-005",
        orderId: "ord-003",
        productId: "prod-105",
        quantity: 1,
        unitPrice: 0.02, // Small item
      },
    ],
    createdAt: new Date("2024-01-20T11:45:00Z"),
    updatedAt: new Date("2024-01-21T10:00:00Z"),
    shippedAt: new Date("2024-01-25T00:00:00Z"), // Not shipped yet
    deliverAt: new Date("2024-01-28T00:00:00Z"), // Expected delivery
  },
  {
    id: "ord-004",
    orderNumber: "ORD-2024-004",
    userId: "user-321",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@example.com",
    customerPhone: "+1-555-0321",
    shippingAddress: {
      street: "321 Maple Dr",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      country: "USA",
    },
    billingAddress: {
      street: "321 Maple Dr",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      country: "USA",
    },
    subtotal: 79.99,
    shippingCost: 8.0,
    taxAmount: 7.04,
    discountAmount: 0,
    status: OrderStatus.CANCELLED,
    paymentMethod: "bank_transfer",
    paymentId: "BANK-11223344",
    orderItems: [
      {
        id: "item-006",
        orderId: "ord-004",
        productId: "prod-106",
        quantity: 1,
        unitPrice: 79.99,
      },
    ],
    createdAt: new Date("2024-01-22T16:20:00Z"),
    updatedAt: new Date("2024-01-23T09:15:00Z"),
    shippedAt: new Date("2024-01-30T00:00:00Z"), // Never shipped
    deliverAt: new Date("2024-02-02T00:00:00Z"), // Never delivered
  },
  {
    id: "ord-005",
    orderNumber: "ORD-2024-005",
    userId: "user-654",
    customerName: "Michael Brown",
    customerEmail: "michael.brown@example.com",
    customerPhone: "+1-555-0654",
    shippingAddress: {
      street: "654 Cedar Ln",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85001",
      country: "USA",
    },
    billingAddress: {
      street: "654 Cedar Ln",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85001",
      country: "USA",
    },
    subtotal: 599.98,
    shippingCost: 0, // Free shipping
    taxAmount: 52.5,
    discountAmount: 100.0,
    status: OrderStatus.PAID,
    paymentMethod: "credit_card",
    paymentId: "pay_5544332211",
    orderItems: [
      {
        id: "item-007",
        orderId: "ord-005",
        productId: "prod-107",
        quantity: 2,
        unitPrice: 199.99,
      },
      {
        id: "item-008",
        orderId: "ord-005",
        productId: "prod-108",
        quantity: 2,
        unitPrice: 100.0,
      },
    ],
    createdAt: new Date("2024-01-25T08:30:00Z"),
    updatedAt: new Date("2024-01-25T08:32:00Z"),
    shippedAt: new Date("2024-01-28T00:00:00Z"), // Expected ship date
    deliverAt: new Date("2024-01-31T00:00:00Z"), // Expected delivery
  },
];
