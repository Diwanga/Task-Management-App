import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

/**
 * Custom Validators
 * Reusable form validators
 */

/**
 * Password strength validator
 * Requires: min 8 chars, uppercase, lowercase, number, special char
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const isLengthValid = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isLengthValid;

    return passwordValid ? null : {
      passwordStrength: {
        hasUpperCase,
        hasLowerCase,
        hasNumeric,
        hasSpecialChar,
        isLengthValid
      }
    };
  };
}

/**
 * Password match validator (for confirm password)
 * Use with FormGroup
 */
export function passwordMatchValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField);
    const confirmPassword = formGroup.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  };
}

/**
 * Phone number validator
 */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const valid = phoneRegex.test(value);

    return valid ? null : { invalidPhone: true };
  };
}

/**
 * URL validator
 */
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const valid = urlRegex.test(value);

    return valid ? null : { invalidUrl: true };
  };
}

/**
 * No whitespace validator
 */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isWhitespace = (value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  };
}

/**
 * Alphanumeric validator
 */
export function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    const valid = alphanumericRegex.test(value);

    return valid ? null : { alphanumeric: true };
  };
}

/**
 * Number only validator
 */
export function numberOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const numberRegex = /^[0-9]+$/;
    const valid = numberRegex.test(value);

    return valid ? null : { numberOnly: true };
  };
}

/**
 * Date range validator
 * Ensures end date is after start date
 */
export function dateRangeValidator(startDateField: string, endDateField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const startDate = formGroup.get(startDateField)?.value;
    const endDate = formGroup.get(endDateField)?.value;

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return { dateRange: true };
    }

    return null;
  };
}

/**
 * Future date validator
 */
export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      return { futureDate: true };
    }

    return null;
  };
}

/**
 * Past date validator
 */
export function pastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      return { pastDate: true };
    }

    return null;
  };
}

/**
 * Min age validator
 * @param minAge Minimum age in years
 */
export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      const actualAge = age - 1;
      if (actualAge < minAge) {
        return { minAge: { requiredAge: minAge, actualAge } };
      }
    } else if (age < minAge) {
      return { minAge: { requiredAge: minAge, actualAge: age } };
    }

    return null;
  };
}

/**
 * File size validator (in bytes)
 * @param maxSize Maximum file size in bytes
 */
export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    if (!file) {
      return null;
    }

    if (file.size > maxSize) {
      return { fileSize: { maxSize, actualSize: file.size } };
    }

    return null;
  };
}

/**
 * File type validator
 * @param allowedTypes Array of allowed MIME types
 */
export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    if (!file) {
      return null;
    }

    if (!allowedTypes.includes(file.type)) {
      return { fileType: { allowedTypes, actualType: file.type } };
    }

    return null;
  };
}

/**
 * Conditional required validator
 * Makes field required based on another field's value
 */
export function conditionalRequiredValidator(
  otherFieldName: string,
  otherFieldValue: any
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    const otherField = control.parent.get(otherFieldName);
    if (!otherField) {
      return null;
    }

    if (otherField.value === otherFieldValue && !control.value) {
      return { conditionalRequired: true };
    }

    return null;
  };
}

/**
 * Array min length validator
 * @param minLength Minimum array length
 */
export function arrayMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!Array.isArray(value)) {
      return null;
    }

    if (value.length < minLength) {
      return { arrayMinLength: { requiredLength: minLength, actualLength: value.length } };
    }

    return null;
  };
}

/**
 * Array max length validator
 * @param maxLength Maximum array length
 */
export function arrayMaxLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!Array.isArray(value)) {
      return null;
    }

    if (value.length > maxLength) {
      return { arrayMaxLength: { requiredLength: maxLength, actualLength: value.length } };
    }

    return null;
  };
}
