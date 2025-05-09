import { Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Outline Default Card
 */
@Component({
  selector: 'hra-action-card-outline-large-image',
  imports: [HraCommonModule, MatIconModule, ButtonsModule, MatDividerModule],
  templateUrl: './action-card-outline-large-image.component.html',
  styleUrl: './action-card-outline-large-image.component.scss',
})
export class ActionCardOutlineLargeImageComponent {
  /** Image url */
  readonly imageUrl = input.required<string>();

  /** Tagline */
  readonly tagline = input<string | undefined>();

  /** Description */
  readonly description = input.required<string>();

  /** Action name */
  readonly actionName = input.required<string>();

  /** Action url */
  readonly actionUrl = input.required<string>();
}
