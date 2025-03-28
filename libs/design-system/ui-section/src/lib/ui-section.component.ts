import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatus, SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'hra-ui-section',
  imports: [CommonModule, ProductLogoComponent, SoftwareStatusIndicatorComponent, ButtonsModule, MatIcon],
  templateUrl: './ui-section.component.html',
  styleUrl: './ui-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSectionComponent {
  /** Product title */
  readonly tagline = input.required<string>();
  /** Product description */
  readonly description = input.required<string>();
  /** Product image path */
  readonly imagePath = input.required<string>();
  /** Product logo */
  readonly logo = input.required<string>();
  /** App software status */
  readonly appStatus = input<SoftwareStatus>();
  /** App url */
  readonly appUrl = input<string>();
  /** Documentation Link */
  readonly documentLink = input<string>();
}
