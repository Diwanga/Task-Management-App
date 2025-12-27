import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import { NotificationService } from '../services/notification.service';
import { HTTP_CONFIG } from '../../utils/constants/app.constants';

/**
 * Error Interceptor
 * Handles HTTP errors globally
 * Logs errors and shows user notifications
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private logger: LoggerService,
    private notificationService: NotificationService
  ) { }

  /**
   * Intercept HTTP requests and handle errors
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // Retry failed requests (except POST, PUT, DELETE)
      retry({
        count: this.shouldRetry(request) ? HTTP_CONFIG.RETRY_ATTEMPTS : 0,
        delay: HTTP_CONFIG.RETRY_DELAY
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error, request);
      })
    );
  }

  /**
   * Determine if request should be retried
   */
  private shouldRetry(request: HttpRequest<any>): boolean {
    // Only retry GET requests
    return request.method === 'GET';
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: HttpErrorResponse, request: HttpRequest<any>): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network error: ${error.error.message}`;
      this.logger.error('Network error occurred', 'ErrorInterceptor', {
        url: request.url,
        error: error.error.message
      });
    } else {
      // Backend error
      errorMessage = this.getErrorMessage(error);
      this.logger.error('HTTP error occurred', 'ErrorInterceptor', {
        url: request.url,
        status: error.status,
        message: errorMessage,
        error: error.error
      });
    }

    // Show error notification (except for 401 which is handled by AuthInterceptor)
    if (error.status !== 401) {
      this.notificationService.error(errorMessage);
    }

    // Return error
    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      error: error.error
    }));
  }

  /**
   * Get user-friendly error message based on status code
   */
  private getErrorMessage(error: HttpErrorResponse): string {
    // Try to get message from error response
    if (error.error?.message) {
      return error.error.message;
    }

    // Default messages based on status code
    switch (error.status) {
      case 0:
        return 'Unable to connect to server. Please check your internet connection.';
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'Conflict. The resource already exists.';
      case 422:
        return 'Validation error. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Internal server error. Please try again later.';
      case 502:
        return 'Bad gateway. The server is temporarily unavailable.';
      case 503:
        return 'Service unavailable. Please try again later.';
      case 504:
        return 'Gateway timeout. The server took too long to respond.';
      default:
        return `An error occurred (Status: ${error.status})`;
    }
  }
}
