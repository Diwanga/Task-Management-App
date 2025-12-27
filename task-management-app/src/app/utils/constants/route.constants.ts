/**
 * Application route paths
 */

/**
 * Public routes (no authentication required)
 */
export const PUBLIC_ROUTES = {
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  VERIFY_EMAIL: 'auth/verify-email'
};

/**
 * Protected routes (authentication required)
 */
export const PROTECTED_ROUTES = {
  DASHBOARD: 'dashboard',
  TASKS: 'tasks',
  TASK_LIST: 'tasks/list',
  TASK_CREATE: 'tasks/create',
  TASK_EDIT: 'tasks/edit',
  TASK_DETAIL: 'tasks/detail',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  USERS: 'users',
  REPORTS: 'reports'
};

/**
 * Route parameter names
 */
export const ROUTE_PARAMS = {
  ID: 'id',
  USER_ID: 'userId',
  TASK_ID: 'taskId',
  TAB: 'tab'
};

/**
 * Query parameter names
 */
export const QUERY_PARAMS = {
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
  SEARCH: 'search',
  STATUS: 'status',
  PRIORITY: 'priority',
  ASSIGNED_TO: 'assignedTo',
  RETURN_URL: 'returnUrl'
};

/**
 * Default redirect routes
 */
export const DEFAULT_ROUTES = {
  AFTER_LOGIN: PROTECTED_ROUTES.DASHBOARD,
  AFTER_LOGOUT: PUBLIC_ROUTES.LOGIN,
  UNAUTHORIZED: PUBLIC_ROUTES.LOGIN,
  NOT_FOUND: '/404',
  ERROR: '/error'
};

/**
 * Route titles for breadcrumbs
 */
export const ROUTE_TITLES = {
  [PROTECTED_ROUTES.DASHBOARD]: 'Dashboard',
  [PROTECTED_ROUTES.TASKS]: 'Tasks',
  [PROTECTED_ROUTES.TASK_LIST]: 'Task List',
  [PROTECTED_ROUTES.TASK_CREATE]: 'Create Task',
  [PROTECTED_ROUTES.TASK_EDIT]: 'Edit Task',
  [PROTECTED_ROUTES.TASK_DETAIL]: 'Task Details',
  [PROTECTED_ROUTES.PROFILE]: 'Profile',
  [PROTECTED_ROUTES.SETTINGS]: 'Settings',
  [PROTECTED_ROUTES.USERS]: 'Users',
  [PROTECTED_ROUTES.REPORTS]: 'Reports',
  [PUBLIC_ROUTES.LOGIN]: 'Login',
  [PUBLIC_ROUTES.REGISTER]: 'Register'
};

/**
 * Helper function to build route with parameters
 */
export function buildRoute(route: string, params: { [key: string]: string | number }): string {
  let finalRoute = route;
  Object.keys(params).forEach(key => {
    finalRoute = finalRoute.replace(`:${key}`, String(params[key]));
  });
  return finalRoute;
}

/**
 * Helper function to build route with query parameters
 */
export function buildRouteWithQuery(
  route: string,
  queryParams: { [key: string]: string | number | boolean }
): string {
  const query = Object.keys(queryParams)
    .map(key => `${key}=${encodeURIComponent(String(queryParams[key]))}`)
    .join('&');
  return query ? `${route}?${query}` : route;
}
