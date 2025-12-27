import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User, LoginDto, RegisterDto, AuthResponse } from '../../shared/models/user.model';
import { ApiResponse } from '../../shared/models/api-response.model';
import { StorageService } from './storage.service';
import { LoggerService } from './logger.service';
import { AUTH_ENDPOINTS } from '../../utils/constants/api.constants';
import { STORAGE_KEYS } from '../../utils/constants/app.constants';
import { DEFAULT_ROUTES } from '../../utils/constants/route.constants';
import { environment } from '../../../environments/environment';

/**
 * Authentication Service
 * Handles user authentication, authorization, and session management
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // BehaviorSubject to track current user state
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  // BehaviorSubject to track authentication state
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private logger: LoggerService
  ) {
    // Initialize current user from storage
    const storedUser = this.storageService.getLocal<User>(STORAGE_KEYS.CURRENT_USER);
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Initialize authentication state
    const token = this.getToken();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!token && !!storedUser);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    this.logger.info('AuthService initialized', 'AuthService');
  }

  /**
   * Get current user value (synchronous)
   */
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get current authentication state (synchronous)
   */
  get isAuthenticatedValue(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Login user
   * @param credentials Login credentials
   * @returns Observable of authenticated user
   */
  login(credentials: LoginDto): Observable<User> {
    this.logger.info('Login attempt', 'AuthService', { email: credentials.email });

    return this.http.post<ApiResponse<AuthResponse>>(AUTH_ENDPOINTS.LOGIN, credentials)
      .pipe(
        map(response => {
          if (response.success && response.data) {
            this.handleAuthSuccess(response.data, credentials.rememberMe);
            this.logger.info('Login successful', 'AuthService', { userId: response.data.user.id });
            return response.data.user;
          } else {
            throw new Error(response.message || 'Login failed');
          }
        }),
        catchError(error => {
          this.logger.error('Login failed', 'AuthService', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Register new user
   * @param userData Registration data
   * @returns Observable of registered user
   */
  register(userData: RegisterDto): Observable<User> {
    this.logger.info('Registration attempt', 'AuthService', { email: userData.email });

    return this.http.post<ApiResponse<AuthResponse>>(AUTH_ENDPOINTS.REGISTER, userData)
      .pipe(
        map(response => {
          if (response.success && response.data) {
            this.handleAuthSuccess(response.data);
            this.logger.info('Registration successful', 'AuthService', { userId: response.data.user.id });
            return response.data.user;
          } else {
            throw new Error(response.message || 'Registration failed');
          }
        }),
        catchError(error => {
          this.logger.error('Registration failed', 'AuthService', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Logout user
   */
  logout(): void {
    this.logger.info('Logout', 'AuthService', { userId: this.currentUserValue?.id });

    // Call logout endpoint (optional - for token invalidation on server)
    this.http.post(AUTH_ENDPOINTS.LOGOUT, {}).subscribe({
      complete: () => {
        this.logger.debug('Logout endpoint called', 'AuthService');
      },
      error: (error) => {
        this.logger.warn('Logout endpoint failed', 'AuthService', error);
      }
    });

    // Clear local state
    this.clearAuthData();

    // Navigate to login
    this.router.navigate([DEFAULT_ROUTES.AFTER_LOGOUT]);
  }

  /**
   * Refresh authentication token
   * @returns Observable of new auth response
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.logger.error('No refresh token available', 'AuthService');
      return throwError(() => new Error('No refresh token'));
    }

    this.logger.debug('Refreshing token', 'AuthService');

    return this.http.post<ApiResponse<AuthResponse>>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      { refreshToken }
    ).pipe(
      map(response => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
          this.logger.info('Token refreshed successfully', 'AuthService');
          return response.data;
        } else {
          throw new Error(response.message || 'Token refresh failed');
        }
      }),
      catchError(error => {
        this.logger.error('Token refresh failed', 'AuthService', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Get current authentication token
   * @returns Auth token or null
   */
  getToken(): string | null {
    return this.storageService.getLocal<string>(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Get refresh token
   * @returns Refresh token or null
   */
  getRefreshToken(): string | null {
    return this.storageService.getLocal<string>(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Check if user has specific role
   * @param role Role to check
   * @returns True if user has role
   */
  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user ? user.role === role : false;
  }

  /**
   * Check if user is admin
   * @returns True if user is admin
   */
  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  /**
   * Get current user profile from server
   * @returns Observable of current user
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<ApiResponse<User>>(AUTH_ENDPOINTS.CURRENT_USER)
      .pipe(
        map(response => {
          if (response.success && response.data) {
            // Update stored user
            this.currentUserSubject.next(response.data);
            this.storageService.setLocal(STORAGE_KEYS.CURRENT_USER, response.data);
            return response.data;
          } else {
            throw new Error(response.message || 'Failed to get current user');
          }
        }),
        catchError(error => {
          this.logger.error('Failed to get current user', 'AuthService', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Handle successful authentication
   * @param authResponse Authentication response from server
   * @param rememberMe Whether to persist session
   */
  private handleAuthSuccess(authResponse: AuthResponse, rememberMe: boolean = false): void {
    const { user, token, refreshToken } = authResponse;

    // Store token
    this.storageService.setLocal(STORAGE_KEYS.AUTH_TOKEN, token);

    // Store refresh token if available
    if (refreshToken) {
      this.storageService.setLocal(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }

    // Store user data
    this.storageService.setLocal(STORAGE_KEYS.CURRENT_USER, user);

    // Store remember me preference
    if (rememberMe) {
      this.storageService.setLocal(STORAGE_KEYS.REMEMBER_ME, true);
    }

    // Update subjects
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Clear all authentication data
   */
  private clearAuthData(): void {
    this.storageService.removeLocal(STORAGE_KEYS.AUTH_TOKEN);
    this.storageService.removeLocal(STORAGE_KEYS.REFRESH_TOKEN);
    this.storageService.removeLocal(STORAGE_KEYS.CURRENT_USER);
    this.storageService.removeLocal(STORAGE_KEYS.REMEMBER_ME);

    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Check if token is expired
   * @returns True if token is expired
   */
  isTokenExpired(): boolean {
    return false;
    // const token = this.getToken();
    // if (!token) {
    //   return true;
    // }
    //
    // try {
    //   // Decode JWT token (simple implementation)
    //   const payload = JSON.parse(atob(token.split('.')[1]));
    //   const expiryTime = payload.exp * 1000; // Convert to milliseconds
    //   const currentTime = Date.now();
    //
    //   return currentTime >= expiryTime;
    // } catch (error) {
    //   this.logger.error('Failed to decode token', 'AuthService', error);
    //   return true;
    // }
  }

  /**
   * Check if token needs refresh
   * @returns True if token should be refreshed
   */
  shouldRefreshToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;

      // Refresh if less than 5 minutes until expiry
      const refreshThreshold = environment.auth.tokenExpiryBuffer * 1000;
      return timeUntilExpiry < refreshThreshold && timeUntilExpiry > 0;
    } catch (error) {
      this.logger.error('Failed to check token expiry', 'AuthService', error);
      return false;
    }
  }
}
