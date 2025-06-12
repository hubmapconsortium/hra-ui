import { Directive, input } from '@angular/core';

/** Input options for icon button size */
export type IconButtonSize = 'small' | 'large';

/**
 * Directive for icon buttons
 */
@Directive({
  selector: '[hraIconButtonSize]',
  standalone: true,
  host: {
    '[class]': '"hra-icon-button-size-" + size()',
  },
})
export class IconButtonSizeDirective {
  /** Size of icon button to use */
  readonly size = input.required<IconButtonSize>({ alias: 'hraIconButtonSize' });
}
