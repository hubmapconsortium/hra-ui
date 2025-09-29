import { AssetUrlPipe } from '@hra-ui/common/url';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { AppLabelComponent } from '@hra-ui/design-system/content-templates/app-label';
import { IconsModule } from '@hra-ui/design-system/icons';
import { SoftwareStatus } from '@hra-ui/design-system/indicators/software-status-indicator';

/** UI Section component for displaying app information and status */
@Component({
  selector: 'hra-ui-section',
  imports: [AppLabelComponent, AssetUrlPipe, ButtonsModule, IconsModule, HraCommonModule, RouterModule],
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
  /** App URL */
  readonly appUrl = input<string>();
  /** Open the app url */
  readonly openAppUrl = output();
  /** Documentation URL */
  readonly documentationUrl = input<string>();
  /** Open the documentation link */
  readonly openDocumentationLink = output();
}
