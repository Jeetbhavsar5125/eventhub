/**
 * Standard paginated response format expected from the API.
 */
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  limit: number;
}

/**
 * Standard API Error response format expected from the API body.
 */
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, string[]>; // e.g. validation errors
}

/**
 * Generic empty response format.
 */
export interface EmptyResponse {
  success: boolean;
}
