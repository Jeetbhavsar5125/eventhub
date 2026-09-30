/**
 * Generic API response wrapper.
 * Used when consuming RESTful endpoints in future feature chunks.
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

/**
 * Paginated API response for list endpoints (events, bookings, users, etc.).
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Standard API error shape returned by the backend.
 * Field-level errors are keyed by field name with an array of messages.
 */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
