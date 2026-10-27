/**
 * Generic API response wrappers matching the backend contracts.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
}
