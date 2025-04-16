import { Directive, input } from '@angular/core';

/** Input options for icon button color */
export type IconButtonVariant = 'light' | 'dark' | 'color';

/**
 * Directive for icon button variants (color)
 */
@Directive({
  selector: '[hraIconButtonVariant]',
  standalone: true,
  host: {
    '[class]': '"hra-icon-button-variant-" + variant()',
  },
})
export class IconButtonVariantDirective {
  /** Input for icon button color variant */
  readonly variant = input<IconButtonVariant>('dark', { alias: 'hraIconButtonVariant' });
}
