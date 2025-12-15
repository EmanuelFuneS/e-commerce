import { Order } from "./orders";

interface User {
  id: string;
  name?: string;
  email: string;
  isActive: boolean;
  roleId: string;
  role?: Role;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
}

export type Role = "admin" | "user" | "guest";

export type { User };
