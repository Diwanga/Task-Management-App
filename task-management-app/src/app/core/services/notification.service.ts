import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Notification Service
 * Displays toast notifications using Angular Material Snackbar
 */

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private defaultDuration = 3000; // 3 seconds
  private defaultHorizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'end';
  private defaultVerticalPosition: 'top' | 'bottom' = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Show success notification
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 3000)
   */
  success(message: string, duration?: number): void {
    this.show(message, NotificationType.SUCCESS, duration);
  }

  /**
   * Show error notification
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 5000)
   */
  error(message: string, duration?: number): void {
    this.show(message, NotificationType.ERROR, duration || 5000);
  }

  /**
   * Show warning notification
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 4000)
   */
  warning(message: string, duration?: number): void {
    this.show(message, NotificationType.WARNING, duration || 4000);
  }

  /**
   * Show info notification
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 3000)
   */
  info(message: string, duration?: number): void {
    this.show(message, NotificationType.INFO, duration);
  }

  /**
   * Show notification with custom configuration
   * @param message Message to display
   * @param type Notification type
   * @param duration Duration in milliseconds
   * @param action Optional action button text
   */
  show(
    message: string,
    type: NotificationType = NotificationType.INFO,
    duration?: number,
    action?: string
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration || this.defaultDuration,
      horizontalPosition: this.defaultHorizontalPosition,
      verticalPosition: this.defaultVerticalPosition,
      panelClass: this.getPanelClass(type)
    };

    this.snackBar.open(message, action || 'Close', config);
  }

  /**
   * Show notification with action callback
   * @param message Message to display
   * @param actionText Action button text
   * @param actionCallback Function to call when action is clicked
   * @param type Notification type
   * @param duration Duration in milliseconds
   */
  showWithAction(
    message: string,
    actionText: string,
    actionCallback: () => void,
    type: NotificationType = NotificationType.INFO,
    duration?: number
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration || this.defaultDuration,
      horizontalPosition: this.defaultHorizontalPosition,
      verticalPosition: this.defaultVerticalPosition,
      panelClass: this.getPanelClass(type)
    };

    const snackBarRef = this.snackBar.open(message, actionText, config);

    snackBarRef.onAction().subscribe(() => {
      actionCallback();
    });
  }

  /**
   * Show persistent notification (no auto-dismiss)
   * @param message Message to display
   * @param type Notification type
   */
  showPersistent(message: string, type: NotificationType = NotificationType.INFO): void {
    const config: MatSnackBarConfig = {
      horizontalPosition: this.defaultHorizontalPosition,
      verticalPosition: this.defaultVerticalPosition,
      panelClass: this.getPanelClass(type)
    };

    this.snackBar.open(message, 'Dismiss', config);
  }

  /**
   * Dismiss all active notifications
   */
  dismiss(): void {
    this.snackBar.dismiss();
  }

  /**
   * Get CSS class for notification type
   * @param type Notification type
   * @returns CSS class name
   */
  private getPanelClass(type: NotificationType): string[] {
    const baseClass = 'custom-snackbar';
    const typeClass = `snackbar-${type}`;
    return [baseClass, typeClass];
  }

  /**
   * Show loading notification
   * @param message Loading message
   * @returns Reference to dismiss the notification
   */
  showLoading(message: string = 'Loading...'): void {
    const config: MatSnackBarConfig = {
      horizontalPosition: this.defaultHorizontalPosition,
      verticalPosition: this.defaultVerticalPosition,
      panelClass: ['custom-snackbar', 'snackbar-info']
    };

    this.snackBar.open(message, '', config);
  }

  /**
   * Show notification for HTTP errors
   * @param error Error object
   */
  showHttpError(error: any): void {
    let message = 'An error occurred';

    if (error.error?.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    } else if (error.status) {
      message = this.getHttpErrorMessage(error.status);
    }

    this.error(message, 5000);
  }

  /**
   * Get user-friendly message for HTTP status codes
   * @param status HTTP status code
   * @returns User-friendly error message
   */
  private getHttpErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 409:
        return 'Conflict. The resource already exists.';
      case 422:
        return 'Validation error. Please check your input.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
}
