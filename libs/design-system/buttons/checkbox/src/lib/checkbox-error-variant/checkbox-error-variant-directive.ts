import { Directive } from '@angular/core';

/**
 * Directive for checkbox error variant
 */
@Directive({
  selector: '[hraCheckboxErrorVariant]',
  host: {
    class: 'hra-checkbox-error-variant',
  },
})
export class CheckboxErrorVariantDirective {}
