import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Form Helper Functions
 * Utility functions for form operations
 */

/**
 * Mark all form controls as touched
 * @param formGroup Form group to mark
 */
export function markFormGroupTouched(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.get(key);
    control?.markAsTouched();

    if (control instanceof FormGroup) {
      markFormGroupTouched(control);
    }
  });
}

/**
 * Get all validation errors from form
 * @param formGroup Form group
 * @returns Object with all errors
 */
export function getAllFormErrors(formGroup: FormGroup): { [key: string]: any } {
  let errors: { [key: string]: any } = {};

  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.get(key);

    if (control instanceof FormGroup) {
      const nestedErrors = getAllFormErrors(control);
      if (Object.keys(nestedErrors).length > 0) {
        errors[key] = nestedErrors;
      }
    } else if (control?.errors) {
      errors[key] = control.errors;
    }
  });

  return errors;
}

/**
 * Reset form to initial values
 * @param formGroup Form group to reset
 * @param initialValues Initial values object
 */
export function resetFormToInitialValues(formGroup: FormGroup, initialValues: any): void {
  formGroup.reset(initialValues);
  formGroup.markAsPristine();
  formGroup.markAsUntouched();
}

/**
 * Get form values as object (excluding disabled controls)
 * @param formGroup Form group
 * @returns Form values object
 */
export function getFormValues(formGroup: FormGroup): any {
  return formGroup.value;
}

/**
 * Get form values including disabled controls
 * @param formGroup Form group
 * @returns Form values object with disabled controls
 */
export function getFormRawValues(formGroup: FormGroup): any {
  return formGroup.getRawValue();
}

/**
 * Check if form has any errors
 * @param formGroup Form group
 * @returns True if form has errors
 */
export function hasFormErrors(formGroup: FormGroup): boolean {
  return !formGroup.valid;
}

/**
 * Get error message for a control
 * @param control Form control
 * @param fieldName Field name for error message
 * @returns Error message string
 */
export function getControlErrorMessage(control: AbstractControl | null, fieldName: string = 'This field'): string {
  if (!control || !control.errors) {
    return '';
  }

  const errors = control.errors;

  if (errors['required']) {
    return `${fieldName} is required`;
  }

  if (errors['email']) {
    return `Please enter a valid email address`;
  }

  if (errors['minlength']) {
    const minLength = errors['minlength'].requiredLength;
    return `${fieldName} must be at least ${minLength} characters`;
  }

  if (errors['maxlength']) {
    const maxLength = errors['maxlength'].requiredLength;
    return `${fieldName} must not exceed ${maxLength} characters`;
  }

  if (errors['min']) {
    const min = errors['min'].min;
    return `${fieldName} must be at least ${min}`;
  }

  if (errors['max']) {
    const max = errors['max'].max;
    return `${fieldName} must not exceed ${max}`;
  }

  if (errors['pattern']) {
    return `${fieldName} format is invalid`;
  }

  if (errors['passwordMismatch']) {
    return `Passwords do not match`;
  }

  if (errors['invalidUrl']) {
    return `Please enter a valid URL`;
  }

  if (errors['invalidPhone']) {
    return `Please enter a valid phone number`;
  }

  // Generic error message for unknown errors
  return `${fieldName} is invalid`;
}

/**
 * Compare two form values to check if changed
 * @param value1 First value
 * @param value2 Second value
 * @returns True if values are different
 */
export function hasFormChanged(value1: any, value2: any): boolean {
  return JSON.stringify(value1) !== JSON.stringify(value2);
}

/**
 * Disable all controls in form group
 * @param formGroup Form group
 */
export function disableAllControls(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(key => {
    formGroup.get(key)?.disable();
  });
}

/**
 * Enable all controls in form group
 * @param formGroup Form group
 */
export function enableAllControls(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(key => {
    formGroup.get(key)?.enable();
  });
}

/**
 * Set validators for multiple controls
 * @param formGroup Form group
 * @param controlNames Array of control names
 * @param validators Validators to set
 */
export function setValidatorsForControls(
  formGroup: FormGroup,
  controlNames: string[],
  validators: any
): void {
  controlNames.forEach(name => {
    const control = formGroup.get(name);
    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  });
}

/**
 * Clear validators for multiple controls
 * @param formGroup Form group
 * @param controlNames Array of control names
 */
export function clearValidatorsForControls(formGroup: FormGroup, controlNames: string[]): void {
  controlNames.forEach(name => {
    const control = formGroup.get(name);
    if (control) {
      control.clearValidators();
      control.updateValueAndValidity();
    }
  });
}

/**
 * Trim all string values in form
 * @param formGroup Form group
 */
export function trimFormValues(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.get(key);
    if (control && typeof control.value === 'string') {
      control.setValue(control.value.trim());
    }
  });
}

/**
 * Get changed fields between two form values
 * @param originalValue Original form value
 * @param currentValue Current form value
 * @returns Object with only changed fields
 */
export function getChangedFields(originalValue: any, currentValue: any): any {
  const changes: any = {};

  Object.keys(currentValue).forEach(key => {
    if (JSON.stringify(originalValue[key]) !== JSON.stringify(currentValue[key])) {
      changes[key] = currentValue[key];
    }
  });

  return changes;
}
