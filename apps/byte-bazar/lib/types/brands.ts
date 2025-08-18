interface Brand {
  id: string;
  name: string;
  logo: string;
  website?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Brand };
