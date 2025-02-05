import { Directive, input } from '@angular/core';

/** Named button sizes */
export type ButtonSize = 'small' | 'medium';

/** Style a mat-button to a specific named size */
@Directive({
  selector: 'button[mat-button][hraButtonSize]:not([hraCtaButton]), a[mat-button][hraButtonSize]:not([hraCtaButton])',
  standalone: true,
  host: {
    '[class]': '"hra-button-size-" + size()',
  },
})
export class ButtonSizeDirective {
  /** Size of button */
  readonly size = input.required<ButtonSize>({ alias: 'hraButtonSize' });
}
