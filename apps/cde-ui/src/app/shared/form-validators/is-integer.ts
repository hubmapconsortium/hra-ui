import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Create a form validator that checks that the provided value is an integer
 *
 * @returns Validator function
 */
export function validateInteger(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: unknown } | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const isInteger = Number.isInteger(value);
    return isInteger ? null : { notInteger: { value: control.value } };
  };
}
