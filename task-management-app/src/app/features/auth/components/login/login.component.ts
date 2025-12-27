import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { DEFAULT_ROUTES } from '../../../../utils/constants/route.constants';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../../utils/constants/app.constants';

/**
 * Login Component
 * User login form
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading = false;
  hidePassword = true;
  returnUrl: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    // Initialize form
    this.initializeForm();

    // Get return URL from query params or default to dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || DEFAULT_ROUTES.AFTER_LOGIN;

    // Redirect if already logged in
    if (this.authService.isAuthenticatedValue) {
      this.router.navigate([this.returnUrl]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize login form
   */
  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['admin@example.com', [Validators.required, Validators.email]],
      password: ['Admin@123', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  /**
   * Get form controls for easy access in template
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      this.notificationService.error(ERROR_MESSAGES.VALIDATION_ERROR);
      return;
    }

    this.loading = true;

    const credentials = this.loginForm.value;

    this.authService.login(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.logger.info('Login successful', 'LoginComponent', { userId: user.id });
          this.notificationService.success(SUCCESS_MESSAGES.LOGIN_SUCCESS);
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.loading = false;
          this.logger.error('Login failed', 'LoginComponent', error);
          const errorMessage = error?.error?.message || ERROR_MESSAGES.SERVER_ERROR;
          this.notificationService.error(errorMessage);
        }
      });
  }

  /**
   * Navigate to registration page
   */
  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  /**
   * Navigate to forgot password page
   */
  goToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
