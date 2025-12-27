import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Async Validators
 * Validators that perform asynchronous checks (e.g., API calls)
 */

@Injectable({
  providedIn: 'root'
})
export class AsyncValidators {

  constructor(private http: HttpClient) { }

  /**
   * Email uniqueness validator
   * Checks if email already exists in database
   */
  emailUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      // Debounce to avoid too many API calls
      return of(control.value).pipe(
        debounceTime(500),
        switchMap(email =>
          this.http.get<{ exists: boolean }>(`/api/v1/users/check-email?email=${email}`)
        ),
        map(response => response.exists ? { emailExists: true } : null),
        catchError(() => of(null))
      );
    };
  }

  /**
   * Username uniqueness validator
   * Checks if username already exists in database
   */
  usernameUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return of(control.value).pipe(
        debounceTime(500),
        switchMap(username =>
          this.http.get<{ exists: boolean }>(`/api/v1/users/check-username?username=${username}`)
        ),
        map(response => response.exists ? { usernameExists: true } : null),
        catchError(() => of(null))
      );
    };
  }

  /**
   * Task title uniqueness validator
   * Checks if task title already exists for the user
   */
  taskTitleUniqueValidator(userId: string, excludeTaskId?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      const params = excludeTaskId
        ? `?userId=${userId}&title=${control.value}&excludeId=${excludeTaskId}`
        : `?userId=${userId}&title=${control.value}`;

      return of(control.value).pipe(
        debounceTime(500),
        switchMap(title =>
          this.http.get<{ exists: boolean }>(`/api/v1/tasks/check-title${params}`)
        ),
        map(response => response.exists ? { taskTitleExists: true } : null),
        catchError(() => of(null))
      );
    };
  }

  /**
   * Generic async uniqueness validator
   * @param endpoint API endpoint to check
   * @param fieldName Field name to check
   * @param errorKey Error key to return
   */
  genericUniqueValidator(
    endpoint: string,
    fieldName: string,
    errorKey: string = 'exists'
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return of(control.value).pipe(
        debounceTime(500),
        switchMap(value =>
          this.http.get<{ exists: boolean }>(`${endpoint}?${fieldName}=${value}`)
        ),
        map(response => response.exists ? { [errorKey]: true } : null),
        catchError(() => of(null))
      );
    };
  }
}
