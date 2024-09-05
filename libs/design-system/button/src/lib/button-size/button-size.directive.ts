import { computed, Directive, input } from '@angular/core';

/** Input options for icon button size */
export type ButtonSize = 'small' | 'medium' | 'large';

/** Interface for button size and font variable */
interface ButtonConfig {
  /** Size of the button */
  size: number;
  /** Font variable for the button */
  font: string;
  /** Padding for the current button size */
  horizontalPadding: number;
}

/** Record of button sizes (number in rem) */
const BUTTON_CONFIG: Record<ButtonSize, ButtonConfig> = {
  small: {
    size: 1.75,
    font: '--sys-label-small',
    horizontalPadding: 0.5,
  },
  medium: {
    size: 2,
    font: '--sys-label-medium',
    horizontalPadding: 0.75,
  },
  large: {
    size: 2.5,
    font: '--sys-label-large',
    horizontalPadding: 1,
  },
};

/**
 * Directive for button sizes
 */
@Directive({
  selector: '[hraButtonSize]',
  standalone: true,
  host: {
    // '[style.--mdc-text-button-container-height.rem]': 'buttonSize()',
    // '[style.font]': 'fontVar()',
    // '[style.--mat-text-button-horizontal-padding.rem]': 'padding()',
    // '[style.--mdc-filled-button-container-height.rem]': 'buttonSize()',
    // '[style.--mat-filled-button-horizontal-padding.rem]': 'padding()',
    // '[style.--mat-standard-button-toggle-height.rem]': 'buttonSize()',
    '[class]': '"button-size-"+size()',
  },
})
export class ButtonSizeDirective {
  /** Size of icon button to use */
  readonly size = input.required<ButtonSize>({ alias: 'hraButtonSize' });

  /** Gets size of button in rem */
  protected readonly buttonSize = computed(() => BUTTON_CONFIG[this.size()].size);

  /** Gets the font variable for the current button size */
  protected readonly fontVar = computed(() => `var(${BUTTON_CONFIG[this.size()].font})`);

  /** Gets the horizontal padding for the current button size */
  protected readonly padding = computed(() => BUTTON_CONFIG[this.size()].horizontalPadding);
}
