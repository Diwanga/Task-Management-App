/**
 * API Response Models
 * Standard response formats for API calls
 */

/**
 * Generic API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
  timestamp: Date;
}

/**
 * API Error details
 */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  stack?: string; // Only in development
}

/**
 * Paginated API Response
 */
export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: PaginationInfo;
  message?: string;
  error?: ApiError;
  timestamp: Date;
}

/**
 * Pagination information
 */
export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Pagination request parameters
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Helper function to create success response
 */
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date()
  };
}

/**
 * Helper function to create error response
 */
export function createErrorResponse(code: string, message: string, details?: any): ApiResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details
    },
    timestamp: new Date()
  };
}

/**
 * Helper function to create paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  pagination: PaginationInfo,
  message?: string
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    pagination,
    message,
    timestamp: new Date()
  };
}

/**
 * Calculate pagination info
 */
export function calculatePagination(
  totalItems: number,
  currentPage: number,
  pageSize: number
): PaginationInfo {
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1
  };
}
