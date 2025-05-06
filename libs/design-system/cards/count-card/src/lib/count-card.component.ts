import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryLogoComponent, toCategoryLogoId } from '@hra-ui/design-system/brand/category-logo';

@Component({
  selector: 'hra-count-card',
  imports: [CommonModule, CategoryLogoComponent],
  templateUrl: './count-card.component.html',
  styleUrl: './count-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountCardComponent {
  /** Count */
  readonly count = input.required<string>();

  /** Label text*/
  readonly label = input.required<string>();

  /** Category icon */
  readonly categoryIcon = input(undefined, { transform: toCategoryLogoId });
}
