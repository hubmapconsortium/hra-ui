import { computed, Directive, input } from '@angular/core';

/** Input options for icon button color */
export type IconButtonColor = 'white' | 'red' | 'black';

const COLOR_MAP: Record<IconButtonColor, string> = {
  black: 'var(--sys-secondary)',
  red: 'var(--sys-on-tertiary-fixed)',
  white: 'var(--sys-on-primary)',
};

/**
 * Directive for icon button variants (color)
 */
@Directive({
  selector: '[hraIconButtonVariant]',
  standalone: true,
  host: {
    '[style.--mdc-icon-button-icon-color]': 'iconColor()',
  },
})
export class IconButtonVariantDirective {
  readonly color = input<IconButtonColor>('black', { alias: 'hraIconButtonVariant' });

  protected readonly iconColor = computed(() => COLOR_MAP[this.color()]);
}
