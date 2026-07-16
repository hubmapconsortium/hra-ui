import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { RouterExtModule } from '@hra-ui/common/router-ext';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { createInjectionToken } from 'ngxtension/create-injection-token';

/** Consent banner configuration */
export interface ConsentBannerConfig {
  /** URL to the privacy policy */
  privacyPolicyUrl?: string;
}

/** Result of the consent banner */
export type ConsentBannerResult = 'allow-all' | 'allow-necessary' | 'customize';

/** Dialog panel class */
export const CONSENT_BANNER_PANEL_CLASS = 'hra-consent-banner-panel';

/** Aria labelledby id of consent banner component */
export const CONSENT_BANNER_ARIA_LABELLEDBY_ID = 'consentBannerDialogTitle';

/** Default configuration for the consent banner */
const DEFAULT_CONSENT_BANNER_CONFIG: Required<ConsentBannerConfig> = {
  privacyPolicyUrl: 'https://humanatlas.io/privacy-policy',
};

/** Injection token for providing and injecting ConsentBannerConfig */
const CONSENT_BANNER_CONFIG_TOKEN = createInjectionToken((): ConsentBannerConfig => DEFAULT_CONSENT_BANNER_CONFIG);

/** Injection function for obtaining the consent banner configuration */
export const injectConsentBannerConfig = CONSENT_BANNER_CONFIG_TOKEN[0];

/** Provider function for supplying new ConsentBannerConfig */
export const provideConsentBannerConfig = CONSENT_BANNER_CONFIG_TOKEN[1];

/** Consent Banner Component */
@Component({
  selector: 'hra-consent-banner',
  imports: [HraCommonModule, MatDialogModule, MatIconModule, BrandModule, ButtonsModule, RouterExtModule],
  templateUrl: './consent-banner.component.html',
  styleUrl: './consent-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'region',
    'aria-labelledby': CONSENT_BANNER_ARIA_LABELLEDBY_ID,
  },
})
export class ConsentBannerComponent {
  /** Emits when one of the actions is clicked */
  readonly buttonClick = output<ConsentBannerResult>();

  /**
   * Aria labelledby id
   */
  readonly ariaLabelledbyId = CONSENT_BANNER_ARIA_LABELLEDBY_ID;

  /** Banner configuration */
  protected readonly config = { ...DEFAULT_CONSENT_BANNER_CONFIG, ...injectConsentBannerConfig() };
}
