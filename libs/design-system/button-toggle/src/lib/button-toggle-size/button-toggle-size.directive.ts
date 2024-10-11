import { computed, Directive, input } from '@angular/core';

/** Input options for icon button size */
export type IconButtonSize = 'small' | 'medium' | 'large';

/** Interface for ButtonToggle Config */
interface ButtonToggleConfig {
  /** Line height of the button */
  lineHeight: number;
  /** Font variable of the button toggle */
  font: string;
}

/** Record of button sizes (number in rem) */
const BUTTON_CONFIG: Record<IconButtonSize, ButtonToggleConfig> = {
  small: {
    lineHeight: 18,
    font: '--sys-label-small',
  },
  medium: {
    lineHeight: 21,
    font: '--sys-label-medium',
  },
  large: {
    lineHeight: 24,
    font: '--sys-label-large',
  },
};

/**
 * Directive for icon buttons
 */
@Directive({
  selector: '[hraButtonToggleSize]',
  standalone: true,
  host: {
    '[style.--mat-standard-button-toggle-height]': 'lineHeight()',
    '[style.--mat-standard-button-toggle-label-text-line-height]': 'lineHeight()',
    '[style.font]': 'fontVar()',
  },
})
export class ToggleButtonSizeDirective {
  /** Size of icon button to use */
  readonly size = input.required<IconButtonSize>({ alias: 'hraButtonToggleSize' });

  /** Gets size of button in rem */
  protected readonly buttonSize = computed(() => BUTTON_CONFIG[this.size()]);

  /** Gets the font variable for the current button size */
  protected readonly fontVar = computed(() => `var(${BUTTON_CONFIG[this.size()].font})`);

  /** Gets the line height for the current button size */
  protected readonly lineHeight = computed(() => `${BUTTON_CONFIG[this.size()].lineHeight}px`);
}
