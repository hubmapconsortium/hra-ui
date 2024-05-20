import { AbstractControl, ValidatorFn } from '@angular/forms';
import { validateInteger } from './is-integer';

describe('validateInteger', () => {
  let validator: ValidatorFn;

  beforeEach(() => {
    validator = validateInteger();
  });

  it('should return null for empty values', () => {
    const control = { value: null } as AbstractControl;
    const errors = validator(control);

    expect(errors).toBeNull();
  });

  it('should return null for valid integer values', () => {
    const controls = [{ value: 0 }, { value: 10 }, { value: -5 }];

    for (const control of controls) {
      const errors = validator(control as AbstractControl);
      expect(errors).toBeNull();
    }
  });

  it('should return error for non-integer values', () => {
    const controls = [{ value: 3.14 }, { value: 'abc' }, { value: true }];

    for (const control of controls) {
      const errors = validator(control as AbstractControl);
      expect(errors).toEqual({ notInteger: { value: control.value } });
    }
  });
});
