export interface Pagination {
  total: number;
  totalPages: number;
  page: number;
  size: number;
  currentPage: number;
}

interface ValidationError {
  name: string;
  messages: string[];
}

export interface AppError {
  name: string;
  message: string;
  validations: ValidationError[] | null;
}

export interface PaginationRequest {
  page?: number;
  search?: string;
  size?: number;
  sortBy?: string;
}

export interface Response<T> {
  code: number;
  status: string;
  message: string;
  data: T | null;
  pagination: Pagination | null;
  errors: AppError | null;
}
