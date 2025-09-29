import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

export type ConsentBannerResult = 'allow-all' | 'allow-necessary' | 'customize';

export const CONSENT_BANNER_ARIA_LABELLEDBY_ID = 'consentBannerDialogTitle';

/** Consent Banner Component */
@Component({
  selector: 'hra-consent-banner',
  imports: [HraCommonModule, MatDialogModule, MatIconModule, BrandModule, ButtonsModule],
  templateUrl: './consent-banner.component.html',
  styleUrl: './consent-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsentBannerComponent {
  readonly ariaLabelledbyId = CONSENT_BANNER_ARIA_LABELLEDBY_ID;
}
