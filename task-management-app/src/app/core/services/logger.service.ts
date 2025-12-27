import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Logger Service
 * Provides centralized logging with different log levels
 * Can be extended to send logs to remote server
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private currentLogLevel: LogLevel;

  constructor() {
    // Set log level based on environment
    this.currentLogLevel = this.getLogLevelFromEnvironment();
  }

  /**
   * Get log level from environment configuration
   */
  private getLogLevelFromEnvironment(): LogLevel {
    const level = environment.logging.level;
    switch (level) {
      case 'debug':
        return LogLevel.DEBUG;
      case 'info':
        return LogLevel.INFO;
      case 'warn':
        return LogLevel.WARN;
      case 'error':
        return LogLevel.ERROR;
      default:
        return LogLevel.INFO;
    }
  }

  /**
   * Check if logging is enabled for given level
   */
  private shouldLog(level: LogLevel): boolean {
    return environment.logging.enableConsole && level >= this.currentLogLevel;
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: string, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    return `[${timestamp}] [${level}] ${contextStr} ${message}`;
  }

  /**
   * Log debug message
   * @param message Message to log
   * @param context Optional context (e.g., component name)
   * @param data Optional additional data
   */
  debug(message: string, context?: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage('DEBUG', message, context), data || '');
    }
  }

  /**
   * Log info message
   * @param message Message to log
   * @param context Optional context (e.g., component name)
   * @param data Optional additional data
   */
  info(message: string, context?: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage('INFO', message, context), data || '');
    }
  }

  /**
   * Log warning message
   * @param message Message to log
   * @param context Optional context (e.g., component name)
   * @param data Optional additional data
   */
  warn(message: string, context?: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage('WARN', message, context), data || '');
    }
  }

  /**
   * Log error message
   * @param message Message to log
   * @param context Optional context (e.g., component name)
   * @param error Optional error object
   */
  error(message: string, context?: string, error?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage('ERROR', message, context), error || '');

      // Send to remote logging service in production
      if (environment.logging.enableRemote && environment.production) {
        this.sendToRemoteLogging('ERROR', message, context, error);
      }
    }
  }

  /**
   * Log HTTP request
   * @param method HTTP method
   * @param url Request URL
   * @param body Request body
   */
  logHttpRequest(method: string, url: string, body?: any): void {
    this.debug(`HTTP ${method} ${url}`, 'HTTP', body);
  }

  /**
   * Log HTTP response
   * @param method HTTP method
   * @param url Request URL
   * @param status Response status
   * @param body Response body
   */
  logHttpResponse(method: string, url: string, status: number, body?: any): void {
    this.debug(`HTTP ${method} ${url} - ${status}`, 'HTTP', body);
  }

  /**
   * Log HTTP error
   * @param method HTTP method
   * @param url Request URL
   * @param error Error object
   */
  logHttpError(method: string, url: string, error: any): void {
    this.error(`HTTP ${method} ${url} failed`, 'HTTP', error);
  }

  /**
   * Log component lifecycle event
   * @param componentName Component name
   * @param lifecycleHook Lifecycle hook name
   */
  logLifecycle(componentName: string, lifecycleHook: string): void {
    this.debug(`${lifecycleHook}`, componentName);
  }

  /**
   * Log navigation event
   * @param from From URL
   * @param to To URL
   */
  logNavigation(from: string, to: string): void {
    this.debug(`Navigation: ${from} -> ${to}`, 'Router');
  }

  /**
   * Group related logs
   * @param label Group label
   * @param callback Function containing logs to group
   */
  group(label: string, callback: () => void): void {
    if (environment.logging.enableConsole) {
      console.group(label);
      callback();
      console.groupEnd();
    }
  }

  /**
   * Start timing operation
   * @param label Timer label
   */
  time(label: string): void {
    if (environment.logging.enableConsole && environment.features.enableDebugMode) {
      console.time(label);
    }
  }

  /**
   * End timing operation
   * @param label Timer label
   */
  timeEnd(label: string): void {
    if (environment.logging.enableConsole && environment.features.enableDebugMode) {
      console.timeEnd(label);
    }
  }

  /**
   * Send logs to remote logging service (placeholder)
   * In production, this would send to services like Sentry, LogRocket, etc.
   */
  private sendToRemoteLogging(level: string, message: string, context?: string, error?: any): void {
    // TODO: Implement remote logging
    // Example: Send to Sentry, LogRocket, CloudWatch, etc.
    // This is a placeholder for future implementation
  }

  /**
   * Log table data (useful for debugging arrays/objects)
   * @param data Data to display in table format
   * @param columns Optional columns to display
   */
  table(data: any, columns?: string[]): void {
    if (environment.logging.enableConsole && environment.features.enableDebugMode) {
      console.table(data, columns);
    }
  }

  /**
   * Clear console
   */
  clear(): void {
    if (environment.logging.enableConsole && environment.features.enableDebugMode) {
      console.clear();
    }
  }
}
