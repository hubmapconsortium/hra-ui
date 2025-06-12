import { Directive, input } from '@angular/core';

/** Button toggle size */
export type ButtonToggleSize = 'small' | 'medium' | 'large';

/** Applies sizing to button toggle groups */
@Directive({
  selector: 'mat-button-toggle-group[hraButtonToggleSize]',
  standalone: true,
  host: {
    '[class]': '"hra-button-toggle-size-" + size()',
  },
})
export class ButtonToggleSizeDirective {
  /** Size of buttons */
  readonly size = input.required<ButtonToggleSize>({ alias: 'hraButtonToggleSize' });
}
