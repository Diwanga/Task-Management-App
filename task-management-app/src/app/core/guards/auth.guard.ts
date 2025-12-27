import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';
import { DEFAULT_ROUTES } from '../../utils/constants/route.constants';

/**
 * Auth Guard
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: LoggerService
  ) { }

  /**
   * Check if route can be activated
   * @param route Activated route snapshot
   * @param state Router state snapshot
   * @returns True if user is authenticated, otherwise redirects to login
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.authService.isAuthenticatedValue;

    if (isAuthenticated) {
      // Check if token is expired
      if (this.authService.isTokenExpired()) {
        this.logger.warn('Token expired, redirecting to login', 'AuthGuard');
        this.authService.logout();
        return this.router.createUrlTree([DEFAULT_ROUTES.UNAUTHORIZED], {
          queryParams: { returnUrl: state.url }
        });
      }

      // Check if token needs refresh
      if (this.authService.shouldRefreshToken()) {
        this.logger.debug('Token needs refresh', 'AuthGuard');
        this.authService.refreshToken().subscribe({
          error: (error) => {
            this.logger.error('Token refresh failed', 'AuthGuard', error);
          }
        });
      }

      this.logger.debug('User authenticated, allowing access', 'AuthGuard');
      return true;
    }

    // User is not authenticated, redirect to login
    this.logger.warn('User not authenticated, redirecting to login', 'AuthGuard');
    return this.router.createUrlTree([DEFAULT_ROUTES.UNAUTHORIZED], {
      queryParams: { returnUrl: state.url }
    });
  }
}
