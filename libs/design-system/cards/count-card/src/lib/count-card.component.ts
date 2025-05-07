import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CategoryLogoComponent, toCategoryLogoId } from '@hra-ui/design-system/brand/category-logo';

/**
 * Component representing a count card.
 * Displays a count, a label, and a category icon.
 */

@Component({
  selector: 'hra-count-card',
  imports: [CommonModule, CategoryLogoComponent],
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

  /** Category icon */
  readonly categoryIcon = input.required({ transform: toCategoryLogoId });
}
