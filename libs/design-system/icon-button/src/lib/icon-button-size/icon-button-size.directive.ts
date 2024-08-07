import { computed, Directive, input } from '@angular/core';

/** Input options for icon button size */
export type IconButtonSize = 'small' | 'medium' | 'large';

/** Record of button sizes (number in rem) */
const BUTTON_SIZES: Record<IconButtonSize, number> = {
  small: 1.5,
  medium: 2.25,
  large: 2.5,
};

/** Record of icon sizes (number in rem) */
const ICON_SIZES: Record<IconButtonSize, number> = {
  small: 1.25,
  medium: 1.5,
  large: 1.5,
};

/**
 * Directive for icon buttons
 */
@Directive({
  selector: '[hraIconButtonSize]',
  standalone: true,
  host: {
    '[style.--mdc-icon-button-state-layer-size.rem]': 'buttonSize()',
    '[style.--mdc-icon-button-icon-size.rem]': 'iconSize()',
  },
})
export class IconButtonSizeDirective {
  /** Size of icon button to use */
  readonly size = input.required<IconButtonSize>({ alias: 'hraIconButtonSize' });

  /** Gets size of button in rem */
  protected readonly buttonSize = computed(() => BUTTON_SIZES[this.size()]);
  /** Gets size of icon in rem */
  protected readonly iconSize = computed(() => ICON_SIZES[this.size()]);
}
