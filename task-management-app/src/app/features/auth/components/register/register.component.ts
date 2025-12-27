// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { passwordStrengthValidator, passwordMatchValidator } from '../../../../utils/validators/custom-validators';
import { DEFAULT_ROUTES } from '../../../../utils/constants/route.constants';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../../../utils/constants/app.constants';

/**
 * Register Component
 * User registration form
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    // Redirect if already logged in
    if (this.authService.isAuthenticatedValue) {
      this.router.navigate([DEFAULT_ROUTES.AFTER_LOGIN]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize registration form
   */
  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
      phone: [''],
      department: ['']
    }, {
      validators: passwordMatchValidator('password', 'confirmPassword')
    });
  }

  /**
   * Get form controls for easy access in template
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      this.notificationService.error(ERROR_MESSAGES.VALIDATION_ERROR);
      return;
    }

    this.loading = true;

    const userData = this.registerForm.value;

    this.authService.register(userData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.logger.info('Registration successful', 'RegisterComponent', { userId: user.id });
          this.notificationService.success(SUCCESS_MESSAGES.REGISTER_SUCCESS);
          this.router.navigate([DEFAULT_ROUTES.AFTER_LOGIN]);
        },
        error: (error) => {
          this.loading = false;
          this.logger.error('Registration failed', 'RegisterComponent', error);
          const errorMessage = error?.error?.message || ERROR_MESSAGES.SERVER_ERROR;
          this.notificationService.error(errorMessage);
        }
      });
  }

  /**
   * Navigate to login page
   */
  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
