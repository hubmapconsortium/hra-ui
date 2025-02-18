import { computed, Directive, input } from '@angular/core';

/** Input options for Software status size */
export type SoftwareStatusSize = 'small' | 'medium' | 'large';

/** Record of button fonts */
const STATUS_FONTS: Record<SoftwareStatusSize, string> = {
  small: 'var(--sys-label-micro)',
  medium: 'var(--sys-label-medium)',
  large: 'var(--sys-label-large)',
};

/**
 * Directive for icon buttons
 */
@Directive({
  selector: '[hraSoftwareStatusSize]',
  standalone: true,
  host: {
    '[style.font]': 'font()',
  },
})
export class SoftwareStatusSizeDirective {
  /** Size of icon button to use */
  readonly size = input.required<SoftwareStatusSize>({ alias: 'hraSoftwareStatusSize' });

  /** Font */
  protected readonly font = computed(() => STATUS_FONTS[this.size()]);
}
