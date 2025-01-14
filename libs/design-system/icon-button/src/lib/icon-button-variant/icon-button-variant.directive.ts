import { Directive, input } from '@angular/core';

/** Input options for icon button color */
export type IconButtonVariant = 'light' | 'dark' | 'default';

/**
 * Directive for icon button variants (color)
 */
@Directive({
  selector: '[hraIconButtonVariant]',
  standalone: true,
  host: {
    '[class]': '"icon-button-variant-" + color()',
  },
})
export class IconButtonVariantDirective {
  readonly color = input<IconButtonVariant>('default', { alias: 'hraIconButtonVariant' });
}
