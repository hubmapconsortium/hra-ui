import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CategoryLogoComponent, toCategoryLogoId } from '@hra-ui/design-system/brand/category-logo';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { OrganLogoComponent, toOrganLogoId } from '@hra-ui/design-system/brand/organ-logo';

/**
 * Component representing a count card.
 * Displays a count, a label, and a category icon.
 */
@Component({
  selector: 'hra-count-card',
  imports: [CommonModule, CategoryLogoComponent, ProductLogoComponent, OrganLogoComponent],
  templateUrl: './count-card.component.html',
  styleUrl: './count-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountCardComponent {
  /** Count */
  readonly count = input.required<number>();

  /** Show suffix for the count */
  readonly showSuffix = input<boolean>();

  /** Label text*/
  readonly label = input.required<string>();

  /** Icon type */
  readonly iconType = input.required<string>();

  /** Icon */
  readonly icon = input.required<string>();

  /** Category icon */
  protected readonly categoryIcon = computed(() =>
    this.iconType() === 'category' ? toCategoryLogoId(this.icon()) : undefined,
  );

  /** Product icon */
  protected readonly productIcon = computed(() =>
    this.iconType() === 'product' ? toProductLogoId(this.icon()) : undefined,
  );

  /** Organ icon */
  protected readonly organIcon = computed(() => (this.iconType() === 'organ' ? toOrganLogoId(this.icon()) : undefined));
}
