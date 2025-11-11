import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HraCommonModule } from '@hra-ui/common';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';

/**
 * Google Maps wrapper component to load and display Google Maps.
 */
@Component({
  selector: 'hra-google-maps',
  imports: [HraCommonModule, ButtonsModule],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GoogleMapsComponent {
  /** DOM sanitizer */
  private readonly sanitizer = inject(DomSanitizer);

  /** Maps URL for the iframe */
  readonly mapsUrl = input.required({
    transform: (value: string) => this.sanitizer.bypassSecurityTrustResourceUrl(value.trim()),
  });

  /** Alternate URL to open in new tab if cookies are disabled */
  readonly alternateUrl = input.required<string>();

  /** Consent service */
  private readonly consentService = inject(ConsentService);

  /** Privacy preferences service */
  private readonly privacyPreferencesService = inject(PrivacyPreferencesService);

  /** Flag indicating whether marketing cookies are enabled */
  protected readonly isMarketingCookiesEnabled = computed(() =>
    this.consentService.isCategoryEnabled(EventCategory.Marketing),
  );

  /** Function to display cookies consent dialog */
  protected enableCookies(): void {
    this.privacyPreferencesService.openPrivacyPreferences('consent');
  }
}
