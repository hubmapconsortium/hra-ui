import { computed, Directive, input } from '@angular/core';

/** Input options for breadcrumb size */
export type BreadcrumbSize = 'small' | 'medium' | 'large';

interface BreadcrumbConfig {
  /** Height of component */
  height: number;
  /** Font variable for the component */
  font: string;
  padding: number;
}

/** Breadcrumb size config (numbers in rem) */
const BREADCRUMB_CONFIG: Record<BreadcrumbSize, BreadcrumbConfig> = {
  small: {
    height: 1.5,
    font: '--sys-label-small',
    padding: 0.25,
  },
  medium: {
    height: 2,
    font: '--sys-label-medium',
    padding: 0.375,
  },
  large: {
    height: 2.25,
    font: '--sys-label-large',
    padding: 0.5,
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
    '[style.--mat-text-button-horizontal-padding.rem]': 'buttonPadding()',
  },
})
export class BreadcrumbsSizeDirective {
  /** Size of breadcrumbs component */
  readonly size = input.required<BreadcrumbSize>({ alias: 'hraBreadcrumbSize' });

  /** Gets the font variable for the current breadcrumbs size */
  protected readonly fontVar = computed(() => `var(${BREADCRUMB_CONFIG[this.size()].font})`);

  protected readonly buttonHeight = computed(() => BREADCRUMB_CONFIG[this.size()].height);

  protected readonly buttonPadding = computed(() => BREADCRUMB_CONFIG[this.size()].padding);
}
