import { Product } from "./products";

export interface StockMovement {
  id: string;
  productId: string;
  type: StockMovementType;
  quantity: number;
  reason: string;
  reference: string;
  userId: string;
  createAt: Date;
  product: Product;
}

export enum StockMovementType {
  IN,
  OUT,
  ADJUST,
}

export const StockMovementTypeLabels: Record<string, string> = {
  [StockMovementType.IN]: "Stock In",
  [StockMovementType.OUT]: "Stock Out",
  [StockMovementType.ADJUST]: "Stock Adjusted",
};

/* export const stockMovements: StockMovement[] = [
  {
    id: "1",
    productId: "prod-001",
    type: StockMovementType.IN,
    quantity: 100,
    reason: "Initial stock",
    reference: "PO-2024-001",
    userId: "user-123",
    createAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "2",
    productId: "prod-001",
    type: StockMovementType.OUT,
    quantity: 15,
    reason: "Sale",
    reference: "ORDER-2024-456",
    userId: "user-456",
    createAt: new Date("2024-01-16T14:20:00Z"),
  },
  {
    id: "3",
    productId: "prod-002",
    type: StockMovementType.IN,
    quantity: 50,
    reason: "Supplier delivery",
    reference: "PO-2024-002",
    userId: "user-123",
    createAt: new Date("2024-01-17T09:00:00Z"),
  },
  {
    id: "4",
    productId: "prod-001",
    type: StockMovementType.ADJUST,
    quantity: -5,
    reason: "Inventory correction - damaged items",
    reference: "ADJ-2024-001",
    userId: "user-789",
    createAt: new Date("2024-01-18T11:45:00Z"),
  },
  {
    id: "5",
    productId: "prod-003",
    type: StockMovementType.IN,
    quantity: 200,
    reason: "Stock replenishment",
    reference: "PO-2024-003",
    userId: "user-123",
    createAt: new Date("2024-01-19T08:15:00Z"),
  },
  {
    id: "6",
    productId: "prod-002",
    type: StockMovementType.OUT,
    quantity: 10,
    reason: "Sale",
    reference: "ORDER-2024-789",
    userId: "user-456",
    createAt: new Date("2024-01-20T16:30:00Z"),
  },
  {
    id: "7",
    productId: "prod-003",
    type: StockMovementType.OUT,
    quantity: 25,
    reason: "Sale",
    reference: "ORDER-2024-790",
    userId: "user-456",
    createAt: new Date("2024-01-21T10:00:00Z"),
  },
  {
    id: "8",
    productId: "prod-001",
    type: StockMovementType.IN,
    quantity: 3,
    reason: "Customer return",
    reference: "RET-2024-001",
    userId: "user-456",
    createAt: new Date("2024-01-22T13:20:00Z"),
  },
  {
    id: "9",
    productId: "prod-004",
    type: StockMovementType.IN,
    quantity: 75,
    reason: "New product arrival",
    reference: "PO-2024-004",
    userId: "user-123",
    createAt: new Date("2024-01-23T09:30:00Z"),
  },
  {
    id: "10",
    productId: "prod-002",
    type: StockMovementType.ADJUST,
    quantity: 2,
    reason: "Inventory recount - found missing items",
    reference: "ADJ-2024-002",
    userId: "user-789",
    createAt: new Date("2024-01-24T15:00:00Z"),
  },
]; */
