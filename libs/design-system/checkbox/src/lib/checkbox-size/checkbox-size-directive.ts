import { computed, Directive, input } from '@angular/core';

/** Input options for checkbox size */
export type CheckboxSize = 'small' | 'large';

/** Record of checkbox sizes (number in rem) */
const CHECKBOX_SIZES: Record<CheckboxSize, number> = {
  small: 1.75,
  large: 2.5,
};

/**
 * Directive for checkbox size
 */
@Directive({
  selector: '[hraCheckboxSize]',
  standalone: true,
  host: {
    '[style.--mdc-checkbox-state-layer-size.rem]': 'checkboxSize()',
  },
})
export class CheckboxSizeDirective {
  /** Size of checkbox to use */
  readonly size = input.required<CheckboxSize>({ alias: 'hraCheckboxSize' });

  /** Gets size of checkbox in rem */
  protected readonly checkboxSize = computed(() => CHECKBOX_SIZES[this.size()]);
}
