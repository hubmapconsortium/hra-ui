import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { SoftwareStatus, SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';

/**
 * App Label Component
 */
@Component({
  selector: 'hra-app-label',
  imports: [ButtonsModule, CommonModule, IconsModule, SoftwareStatusIndicatorComponent],
  templateUrl: './app-label.component.html',
  styleUrl: './app-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLabelComponent {
  /** Product title */
  readonly tagline = input.required<string>();
  /** Product logo */
  readonly logo = input.required<string>();
  /** App software status */
  readonly appStatus = input<SoftwareStatus>();
}
