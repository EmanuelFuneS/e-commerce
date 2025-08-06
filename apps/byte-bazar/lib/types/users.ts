import { Order } from "./orders";

interface User {
  id: string;
  name?: string;
  email: string;
  isActive: boolean;
  role?: Role;
  lastLogin?: Date;
  picture?: string;
  auth0_id: string;
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
}

export type Role = "admin" | "user" | "guest";

export type { User };
