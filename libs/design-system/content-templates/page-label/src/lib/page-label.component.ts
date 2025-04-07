import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OrganLogoComponent, toOrganLogoId } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { CategoryLogoComponent, toCategoryLogoId } from '@hra-ui/design-system/brand/category-logo';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

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
  readonly tagline = input.required<string>();
  readonly anchor = input<string>();

  readonly app = input<string>();
  readonly organ = input<string>();
  readonly category = input<string>();

  protected readonly appId = computed(() => {
    const app = this.app();
    if (typeof app === 'string') {
      return toProductLogoId(app);
    }
    return undefined;
  });

  protected readonly organId = computed(() => {
    const organ = this.organ();
    if (typeof organ === 'string') {
      return toOrganLogoId(organ);
    }
    return undefined;
  });

  protected readonly categoryId = computed(() => {
    const category = this.category();
    if (typeof category === 'string') {
      return toCategoryLogoId(category);
    }
    return undefined;
  });
}
