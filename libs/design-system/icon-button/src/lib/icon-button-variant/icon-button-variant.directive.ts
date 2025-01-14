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
    '[class]': '"icon-button-variant-" + variant()',
  },
})
export class IconButtonVariantDirective {
  /** Input for icon button color variant */
  readonly variant = input<IconButtonVariant>('default', { alias: 'hraIconButtonVariant' });
}
