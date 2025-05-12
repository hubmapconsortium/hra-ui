import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CategoryLogoComponent } from '@hra-ui/design-system/brand/category-logo';
import { OrganLogoComponent } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { BRAND } from 'zod';

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

  /** Product icon */
  readonly product = input<string & BRAND<'ProductLogoId'>>();

  /** Organ icon */
  readonly organ = input<string & BRAND<'OrganLogoId'>>();

  /** Website category icon */
  readonly category = input<string & BRAND<'CategoryLogoId'>>();

  /** Anchor id of this label */
  readonly anchor = input<string>();

  /** Whether any of the icon inputs are set */
  protected readonly hasIcons = computed(() => this.product() || this.organ() || this.category());
}
