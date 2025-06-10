import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { IconsModule } from '@hra-ui/design-system/icons';

/**
 * Component representing a count card.
 * Displays a count, a label, and an icon.
 */
@Component({
  selector: 'hra-count-card',
  imports: [HraCommonModule, IconsModule],
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
  readonly iconType = input<string>();

  /** Icon */
  readonly icon = input.required<string>();
}
