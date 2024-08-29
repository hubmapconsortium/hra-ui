import { computed, Directive, input } from '@angular/core';

/** Input options for breadcrumb size */
export type BreadcrumbSize = 'small' | 'medium' | 'large';

/** Record of breadcrumb font sizes */
const BREADCRUMB_CONFIG: Record<BreadcrumbSize, string> = {
  small: '--sys-label-small',
  medium: '--sys-label-medium',
  large: '--sys-label-large',
};

/**
 * Directive for breadcrumb sizes
 */
@Directive({
  selector: '[hraBreadcrumbSize]',
  standalone: true,
  host: {
    '[style.--breadcrumbs-font]': 'fontVar()',
  },
})
export class BreadcrumbsSizeDirective {
  /** Size of breadcrumbs component */
  readonly size = input.required<BreadcrumbSize>({ alias: 'hraBreadcrumbSize' });

  /** Gets the font variable for the current breadcrumbs size */
  protected readonly fontVar = computed(() => `var(${BREADCRUMB_CONFIG[this.size()]})`);
}
