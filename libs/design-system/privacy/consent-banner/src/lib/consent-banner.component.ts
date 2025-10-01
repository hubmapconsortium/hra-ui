import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/** Result of the consent banner */
export type ConsentBannerResult = 'allow-all' | 'allow-necessary' | 'customize';

/** Dialog panel class */
export const CONSENT_BANNER_PANEL_CLASS = 'hra-consent-banner-panel';

/** Aria labelledby id of consent banner component */
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
  /**
   * Aria labelledby id
   */
  readonly ariaLabelledbyId = CONSENT_BANNER_ARIA_LABELLEDBY_ID;
}
