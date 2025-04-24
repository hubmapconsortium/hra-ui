import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SoftwareStatus, SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';

/**
 * App Label Component
 */
@Component({
  selector: 'hra-app-label',
  imports: [CommonModule, ProductLogoComponent, SoftwareStatusIndicatorComponent, ButtonsModule],
  templateUrl: './app-label.component.html',
  styleUrl: './app-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLabelComponent {
  /** Product title */
  readonly tagline = input.required<string>();
  /** Product logo */
  readonly logo = input.required({ transform: toProductLogoId });
  /** App software status */
  readonly appStatus = input<SoftwareStatus>();
}
