/**
 * API endpoints and configuration
 */

/**
 * Base API URL - will be set from environment
 */
export const API_BASE_URL = '/api';

/**
 * API version
 */
export const API_VERSION = 'v1';

/**
 * Full API path
 */
export const API_PATH = `${API_BASE_URL}/${API_VERSION}`;

/**
 * Authentication endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_PATH}/auth/login`,
  REGISTER: `${API_PATH}/auth/register`,
  LOGOUT: `${API_PATH}/auth/logout`,
  REFRESH_TOKEN: `${API_PATH}/auth/refresh`,
  FORGOT_PASSWORD: `${API_PATH}/auth/forgot-password`,
  RESET_PASSWORD: `${API_PATH}/auth/reset-password`,
  VERIFY_EMAIL: `${API_PATH}/auth/verify-email`,
  CURRENT_USER: `${API_PATH}/auth/me`
};

/**
 * User endpoints
 */
export const USER_ENDPOINTS = {
  BASE: `${API_PATH}/users`,
  BY_ID: (id: string) => `${API_PATH}/users/${id}`,
  UPDATE_PROFILE: `${API_PATH}/users/profile`,
  CHANGE_PASSWORD: `${API_PATH}/users/change-password`,
  UPLOAD_AVATAR: `${API_PATH}/users/avatar`
};

/**
 * Task endpoints
 */
export const TASK_ENDPOINTS = {
  BASE: `${API_PATH}/tasks`,
  BY_ID: (id: string) => `${API_PATH}/tasks/${id}`,
  BY_STATUS: (status: string) => `${API_PATH}/tasks/status/${status}`,
  BY_USER: (userId: string) => `${API_PATH}/tasks/user/${userId}`,
  STATS: `${API_PATH}/tasks/stats`,
  RECENT: `${API_PATH}/tasks/recent`,
  OVERDUE: `${API_PATH}/tasks/overdue`,
  DUE_TODAY: `${API_PATH}/tasks/due-today`,
  SEARCH: `${API_PATH}/tasks/search`
};

/**
 * HTTP Headers
 */
export const HTTP_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  CACHE_CONTROL: 'Cache-Control'
};

/**
 * Content types
 */
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain'
};

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

/**
 * Request timeout (milliseconds)
 */
export const REQUEST_TIMEOUT = 30000;

/**
 * Token refresh threshold (seconds before expiry)
 */
export const TOKEN_REFRESH_THRESHOLD = 300; // 5 minutes
