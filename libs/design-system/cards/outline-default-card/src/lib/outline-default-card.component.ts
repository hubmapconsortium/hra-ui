import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Outline Default Card
 */
@Component({
  selector: 'hra-outline-default-card',
  imports: [HraCommonModule, MatIconModule, ButtonsModule, ProductLogoComponent],
  templateUrl: './outline-default-card.component.html',
  styleUrl: './outline-default-card.component.scss',
})
export class OutlineDefaultCardComponent {
  /** Logo name */
  readonly logo = input(undefined, { transform: toProductLogoId });
  /** Tagline */
  readonly tagline = input<string | undefined>();
  /** Description */
  readonly description = input.required<string>();
  /** Hide Embed button */
  readonly hideEmbedButton = input<boolean>();
}
