interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  role: "admin" | "user" | "guest";
  lastLogin?: Date; // Optional field for last login time
}

export type { User };
export type UserRole = User["role"];
