import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OrganLogoComponent, toOrganLogoId } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';

@Component({
  selector: 'hra-page-label',
  imports: [CommonModule, ProductLogoComponent, OrganLogoComponent, SectionLinkComponent, MatIconModule],
  templateUrl: './page-label.component.html',
  styleUrl: './page-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLabelComponent {
  readonly app = input.required<string>();
  readonly organ = input<string | undefined>(undefined);
  readonly tagline = input.required<string>();
  readonly anchor = input<string>();

  protected readonly appId = computed(() => toProductLogoId(this.app()));
  protected readonly organId = computed(() => {
    const organ = this.organ();
    if (typeof organ === 'string') {
      return toOrganLogoId(organ);
    }
    return undefined;
  });
}
