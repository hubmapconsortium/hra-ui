import { Directive } from '@angular/core';

/**
 * Directive for checkbox error variant
 */
@Directive({
  selector: '[hraCheckboxErrorVariant]',
  standalone: true,
  host: {
    class: 'hra-checkbox-error-variant',
  },
})
export class CheckboxErrorVariantDirective {}
