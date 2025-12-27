/**
 * Staging environment configuration
 */

export const environment = {
  production: false,
  apiUrl: 'https://staging-api.taskmanagement.com/api',
  appName: 'Task Management System (Staging)',
  version: '1.0.0-staging',

  // Feature flags
  features: {
    enableLogging: true,
    enableDebugMode: true,
    enableMockApi: false,
    enableAnalytics: true
  },

  // API configuration
  api: {
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  },

  // Authentication
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiryBuffer: 300 // 5 minutes in seconds
  },

  // Logging
  logging: {
    level: 'info', // 'debug' | 'info' | 'warn' | 'error'
    enableConsole: true,
    enableRemote: true
  }
};
