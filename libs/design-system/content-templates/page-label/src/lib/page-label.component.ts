import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CategoryLogoComponent, toCategoryLogoId } from '@hra-ui/design-system/brand/category-logo';
import { OrganLogoComponent, toOrganLogoId } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

/**
 * Page label to display on top of a page template
 */
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
  /** Text on header */
  readonly tagline = input.required<string>();

  /** App icon */
  readonly app = input<string>();

  /** Organ icon */
  readonly organ = input<string>();

  /** Website category icon */
  readonly category = input<string>();

  /** Whether to include a link for the page header */
  readonly includeLink = input<boolean>(false);

  /** Anchor for link url */
  protected readonly anchor = computed(() => {
    if (this.includeLink()) {
      return this.tagline().toLowerCase().replace(/\s+/g, '-');
    }
    return undefined;
  });

  /** Returns a valid app logo id */
  protected readonly appId = computed(() => {
    const app = this.app();
    if (typeof app === 'string') {
      return toProductLogoId(app);
    }
    return undefined;
  });

  /** Returns a valid organ logo id */
  protected readonly organId = computed(() => {
    const organ = this.organ();
    if (typeof organ === 'string') {
      return toOrganLogoId(organ);
    }
    return undefined;
  });

  /** Returns a valid category logo id */
  protected readonly categoryId = computed(() => {
    const category = this.category();
    if (typeof category === 'string') {
      return toCategoryLogoId(category);
    }
    return undefined;
  });
}
