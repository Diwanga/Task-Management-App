/**
 * Production environment configuration
 */

export const environment = {
  production: true,
  apiUrl: 'https://api.taskmanagement.com/api',
  appName: 'Task Management System',
  version: '1.0.0',

  // Feature flags
  features: {
    enableLogging: false,
    enableDebugMode: false,
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
    level: 'error', // 'debug' | 'info' | 'warn' | 'error'
    enableConsole: false,
    enableRemote: true
  }
};
