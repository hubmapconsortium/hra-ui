import { computed, Directive, input } from '@angular/core';

/** Input options for breadcrumb size */
export type BreadcrumbSize = 'small' | 'medium' | 'large';

/**
 * Breadcrumb size config interface
 */
interface BreadcrumbConfig {
  /** Height of component */
  height: number;
  /** Font variable for the component */
  font: string;
}

/** Breadcrumb size config (numbers in rem) */
const BREADCRUMB_CONFIG: Record<BreadcrumbSize, BreadcrumbConfig> = {
  small: {
    height: 1.5,
    font: '--sys-label-small',
  },
  medium: {
    height: 1.5,
    font: '--sys-label-medium',
  },
  large: {
    height: 1.75,
    font: '--sys-label-large',
  },
};

/**
 * Directive for breadcrumb sizes
 */
@Directive({
  selector: '[hraBreadcrumbSize]',
  standalone: true,
  host: {
    '[style.font]': 'fontVar()',
    '[style.--mdc-text-button-container-height.rem]': 'buttonHeight()',
  },
})
export class BreadcrumbsSizeDirective {
  /** Size of breadcrumbs component */
  readonly size = input.required<BreadcrumbSize>({ alias: 'hraBreadcrumbSize' });

  /** Gets the font variable for the current breadcrumbs size */
  protected readonly fontVar = computed(() => `var(${BREADCRUMB_CONFIG[this.size()].font})`);

  /** Gets the button height for the current breadcrumbs size */
  protected readonly buttonHeight = computed(() => BREADCRUMB_CONFIG[this.size()].height);
}
