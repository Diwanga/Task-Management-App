/**
 * Application-wide constants
 */

/**
 * Application metadata
 */
export const APP_CONFIG = {
  name: 'Task Management System',
  version: '1.0.0',
  description: 'Angular 13 Task Management Application',
  author: 'Your Name',
  supportEmail: 'support@taskmanagement.com'
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  CURRENT_USER: 'current_user',
  REMEMBER_ME: 'remember_me',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  SIDEBAR_STATE: 'sidebar_state'
};

/**
 * Date format patterns
 */
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
  TIME_ONLY: 'HH:mm',
  SHORT_DATE: 'MM/dd/yyyy',
  LONG_DATE: 'MMMM dd, yyyy'
};

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  MAX_PAGE_SIZE: 100
};

/**
 * Validation patterns
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  INVALID_USERNAME: 'Username must be 3-20 characters and contain only letters, numbers, underscore and hyphen',
  PASSWORD_MISMATCH: 'Passwords do not match',
  MIN_LENGTH: 'Minimum length is {0} characters',
  MAX_LENGTH: 'Maximum length is {0} characters',
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Please fix the validation errors'
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTER_SUCCESS: 'Registration successful',
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  CHANGES_SAVED: 'Changes saved successfully'
};

/**
 * HTTP timeout settings (in milliseconds)
 */
export const HTTP_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 second
};

/**
 * Debounce delays (in milliseconds)
 */
export const DEBOUNCE_TIME = {
  SEARCH: 300,
  AUTOSAVE: 1000,
  RESIZE: 200,
  SCROLL: 100
};

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  SHORT: 200,
  MEDIUM: 300,
  LONG: 500
};

/**
 * File upload settings
 */
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
};
