import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { LoggerService } from '../services/logger.service';

/**
 * Loading Interceptor
 * Shows/hides global loading indicator during HTTP requests
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(
    private loadingService: LoadingService,
    private logger: LoggerService
  ) { }

  /**
   * Intercept HTTP requests to track loading state
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if request should show loading indicator
    if (this.shouldShowLoading(request)) {
      this.totalRequests++;
      this.loadingService.show();

      this.logger.debug(`HTTP request started (${this.totalRequests} active)`, 'LoadingInterceptor', {
        method: request.method,
        url: request.url
      });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.logger.debug('HTTP request completed', 'LoadingInterceptor', {
            method: request.method,
            url: request.url,
            status: event.status
          });
        }
      }),
      finalize(() => {
        if (this.shouldShowLoading(request)) {
          this.totalRequests--;

          if (this.totalRequests === 0) {
            this.loadingService.hide();
          }

          this.logger.debug(`HTTP request finished (${this.totalRequests} active)`, 'LoadingInterceptor');
        }
      })
    );
  }

  /**
   * Determine if loading indicator should be shown for this request
   * @param request HTTP request
   * @returns True if loading should be shown
   */
  private shouldShowLoading(request: HttpRequest<any>): boolean {
    // Don't show loading for requests with custom header
    if (request.headers.has('X-Skip-Loading')) {
      return false;
    }

    // Don't show loading for polling requests
    if (request.headers.has('X-Polling')) {
      return false;
    }

    // Show loading by default
    return true;
  }
}
