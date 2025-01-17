import { Directive, input } from '@angular/core';

/**
 * Directive for checkbox color
 */
@Directive({
  selector: '[hraCheckboxColor]',
  standalone: true,
  host: {
    '[style.--mdc-checkbox-unselected-icon-color]': 'checkboxColor()',
    '[style.--mdc-checkbox-selected-icon-color]': 'checkboxColor()',
    '[style.--mdc-checkbox-selected-checkmark-color]': 'checkmarkColor()',
  },
})
export class CheckboxColorDirective {
  readonly checkboxColor = input<string>();
  readonly checkmarkColor = input<string>();
}
