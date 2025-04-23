import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { AppLabelComponent } from '@hra-ui/design-system/app-label';
import { toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SoftwareStatus } from '@hra-ui/design-system/software-status-indicator';

/** UI Section component for displaying app information and status */
@Component({
  selector: 'hra-ui-section',
  imports: [CommonModule, HraCommonModule, ButtonsModule, MatIcon, AppLabelComponent],
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
  readonly logo = input.required({ transform: toProductLogoId });
  /** App software status */
  readonly appStatus = input<SoftwareStatus>();

  /** Open the app url */
  readonly openAppUrl = output();
  /** Open the documentation link */
  readonly openDocumentationLink = output();
}
