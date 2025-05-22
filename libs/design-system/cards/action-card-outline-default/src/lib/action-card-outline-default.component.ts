import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Outline Default Card
 */
@Component({
  selector: 'hra-action-card-outline-default',
  imports: [HraCommonModule, MatIconModule, ButtonsModule, ProductLogoComponent],
  templateUrl: './action-card-outline-default.component.html',
  styleUrl: './action-card-outline-default.component.scss',
})
export class ActionCardOutlineDefaultComponent {
  /** App name */
  readonly app = input(undefined, { transform: toProductLogoId });

  /** Tagline */
  readonly tagline = input<string | undefined>();

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
