import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Component representing an elevated action card, commonly used for web components
 * Displays an image, product title, component name, and description.
 */

@Component({
  selector: 'hra-action-card-elevated',
  imports: [ButtonsModule, HraCommonModule],
  templateUrl: './action-card-elevated.component.html',
  styleUrl: './action-card-elevated.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardElevatedComponent {
  /** Image url */
  readonly imageUrl = input.required<string>();

  /** Product title */
  readonly productTitle = input.required<string>();

  /** Component Name */
  readonly componentName = input<string | undefined>();

  /** Description */
  readonly description = input.required<string>();

  /** Hide Embed button */
  readonly hideEmbedButton = input<boolean>();

  /** Emits true when the Embed button is clicked */
  readonly embedClick = output();

  /** Emits true when the Use App button is clicked */
  readonly useAppClick = output();
}
