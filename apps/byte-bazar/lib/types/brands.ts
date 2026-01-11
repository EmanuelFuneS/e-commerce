interface Brand {
  id?: string;
  name: string;
  logo?: string | null | undefined;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { Brand };
