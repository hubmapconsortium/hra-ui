import { AbstractControl, ValidatorFn } from '@angular/forms';

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
