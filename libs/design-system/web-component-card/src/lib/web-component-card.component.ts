import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Component representing a web component card.
 * Displays an image, product title, web component name, and description.
 */

@Component({
  selector: 'hra-web-component-card',
  standalone: true,
  imports: [ButtonsModule, CommonModule],
  templateUrl: './web-component-card.component.html',
  styleUrl: './web-component-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponentCardComponent {
  /** Image url */
  readonly imageUrl = input.required<string>();
  /** Product title */
  readonly productTitle = input.required<string>();
  /** Web Component Name */
  readonly webComponentName = input<string | undefined>();
  /** Description */
  readonly description = input.required<string>();
}
