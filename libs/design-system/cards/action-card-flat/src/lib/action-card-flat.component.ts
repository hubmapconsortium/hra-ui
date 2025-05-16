import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Component representing an flat action card
 * Displays an image, card tagline, and description.
 */

@Component({
  selector: 'hra-action-card-flat',
  imports: [ButtonsModule, HraCommonModule, MatIconModule],
  templateUrl: './action-card-flat.component.html',
  styleUrl: './action-card-flat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardFlatComponent {
  /** Image url */
  readonly imageUrl = input.required<string>();

  /** Component Name */
  readonly componentName = input<string | undefined>();

  /** Description */
  readonly description = input.required<string>();

  /** Left action name */
  readonly leftActionName = input.required<string>();

  /** Left action url */
  readonly leftActionUrl = input.required<string>();

  /** Right action name */
  readonly rightActionName = input.required<string>();

  /** Right action url */
  readonly rightActionUrl = input.required<string>();
}
