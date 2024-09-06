import { Directive, input } from '@angular/core';

/** Input options for icon button size */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Directive for button sizes
 */
@Directive({
  selector: '[hraButtonSize]',
  standalone: true,
  host: {
    '[class]': '"button-size-"+size()',
  },
})
export class ButtonSizeDirective {
  /** Size of icon button to use */
  readonly size = input.required<ButtonSize>({ alias: 'hraButtonSize' });
}
