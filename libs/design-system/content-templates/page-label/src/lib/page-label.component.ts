import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CategoryLogoComponent, toCategoryLogoId } from '@hra-ui/design-system/brand/category-logo';
import { OrganLogoComponent, toOrganLogoId } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

/** Label for a page section. Can also be used standalone */
@Component({
  selector: 'hra-page-label',
  imports: [
    CommonModule,
    ProductLogoComponent,
    OrganLogoComponent,
    CategoryLogoComponent,
    SectionLinkComponent,
    MatIconModule,
  ],
  templateUrl: './page-label.component.html',
  styleUrl: './page-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLabelComponent {
  /** Label */
  readonly tagline = input.required<string>();

  /** Which level of <hx> to use */
  readonly level = input(1, { transform: numberAttribute });

  // TODO needs icon update
  /** App icon */
  readonly app = input(undefined, { transform: toProductLogoId });

  /** Organ icon */
  readonly organ = input(undefined, { transform: toOrganLogoId });

  /** Website category icon */
  readonly category = input(undefined, { transform: toCategoryLogoId });

  /** Anchor id of this label */
  readonly anchor = input<string>();

  /** Whether any of the icon inputs are set */
  protected readonly hasIcons = computed(() => this.app() || this.organ() || this.category());
}
