import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/** Logo size type */
export type ProductLogoSize = 'small' | 'large';

/**
 * HRA product logos
 */
@Component({
  selector: 'hra-product-logo',
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-logo.component.html',
  styleUrl: './product-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLogoComponent {
  /** Logo name */
  readonly name = input.required<string>();

  /** Logo size */
  readonly size = input.required<ProductLogoSize>();

  /** Icon to display */
  protected readonly icon = computed(() => `products:${this.name()}`);
}
