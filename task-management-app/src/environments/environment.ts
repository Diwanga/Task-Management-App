// // This file can be replaced during build by using the `fileReplacements` array.
// // `ng build` replaces `environment.ts` with `environment.prod.ts`.
// // The list of file replacements can be found in `angular.json`.
//
// export const environment = {
//   production: false
// };
//
// /*
//  * For easier debugging in development mode, you can import the following file
//  * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
//  *
//  * This import should be commented out in production mode because it will have a negative impact
//  * on performance if an error is thrown.
//  */
// // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/**
 * Development environment configuration
 */

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Task Management System',
  version: '1.0.0-dev',

  // Feature flags
  features: {
    enableLogging: true,
    enableDebugMode: true,
    enableMockApi: true,
    enableAnalytics: false
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
    level: 'debug', // 'debug' | 'info' | 'warn' | 'error'
    enableConsole: true,
    enableRemote: false
  }
};
