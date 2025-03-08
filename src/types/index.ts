export interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
  pagination: {
    perPage: number;
    total: number;
    currentPage: number;
  };
}
