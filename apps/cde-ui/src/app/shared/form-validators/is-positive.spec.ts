import { AbstractControl, ValidatorFn } from '@angular/forms';
import { validatePositive } from './is-positive';

describe('validatePositive', () => {
  let validator: ValidatorFn;

  beforeEach(() => {
    validator = validatePositive();
  });

  it('should return null for empty values', () => {
    const control = { value: null } as AbstractControl;
    const errors = validator(control);

    expect(errors).toBeNull();
  });

  it('should return null for numbers greater than 0', () => {
    const controls = [{ value: 0.65 }, { value: 1 }, { value: 1000 }];

    for (const control of controls) {
      const errors = validator(control as AbstractControl);
      expect(errors).toBeNull();
    }
  });

  it('should return error for 0, negative, and non-numeric values', () => {
    const controls = [{ value: 0 }, { value: -1 }, { value: Number.NaN }, { value: 'abc' }];

    for (const control of controls) {
      const errors = validator(control as AbstractControl);
      expect(errors).toEqual({ notPositive: { value: control.value } });
    }
  });
});
