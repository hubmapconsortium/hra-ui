import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';

import { CtaButtonDirective } from './directives/cta.directive';
import { ButtonSize, ButtonSizeDirective } from './directives/size.directive';
import { ButtonVariant, ButtonVariantDirective } from './directives/variant.directive';

/**
 * HRA button component to be used in design system templates
 */
@Component({
  selector: 'hra-button',
  imports: [
    HraCommonModule,
    MatButtonModule,
    MatIconModule,
    CtaButtonDirective,
    ButtonSizeDirective,
    ButtonVariantDirective,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /** Button label */
  readonly label = input.required<string>();

  /** Button link */
  readonly href = input.required<string>();

  /** Button version */
  readonly type = input<'default' | 'flat' | 'cta' | 'fab'>('default');

  /** Button color variant */
  readonly variant = input<ButtonVariant>('primary');

  /** Button size */
  readonly size = input<ButtonSize>('medium');

  /** Whether button is disabled */
  readonly disabled = input<boolean>(false);

  /** Icon to use in the button (can't be changed for CTA button) */
  readonly icon = input<string>();
}
