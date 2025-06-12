import { Directive, input } from '@angular/core';

/** Named button sizes */
export type ButtonSize = 'small' | 'medium';

/** Style a mat-button to a specific named size */
@Directive({
  selector: 'button[mat-button][hraButtonSize], a[mat-button][hraButtonSize]',
  standalone: true,
  host: {
    '[class]': '"hra-button-size-" + size()',
  },
})
export class ButtonSizeDirective {
  /** Size of button */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly size = input.required<ButtonSize>({ alias: 'hraButtonSize' });
}
