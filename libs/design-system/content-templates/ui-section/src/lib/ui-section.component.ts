import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { SoftwareStatus, SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIcon } from '@angular/material/icon';

/** UI Section component for displaying app information and status */
@Component({
  selector: 'hra-ui-section',
  imports: [
    CommonModule,
    HraCommonModule,
    ProductLogoComponent,
    SoftwareStatusIndicatorComponent,
    ButtonsModule,
    MatIcon,
  ],
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
