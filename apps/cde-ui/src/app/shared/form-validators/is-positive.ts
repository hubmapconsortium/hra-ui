import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Create a form validator that checks that the provided value is a number greater than 0
 *
 * @returns Validator function
 */
export function validatePositive(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: unknown } | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const isPositive = typeof value === 'number' && value > 0;
    return isPositive ? null : { notPositive: { value: control.value } };
  };
}
