export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, unknown>;
  total?: number;
  pagination?: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export type ActionResponse<T = Record<string, unknown>> = ApiResponse<T>;

export type OptionalParams<T> = T | undefined;

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}
