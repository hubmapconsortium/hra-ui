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
  standalone: true,
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleMapsComponent {
  /** DOM sanitizer */
  private readonly sanitizer = inject(DomSanitizer);

  /** Maps URL for the iframe */
  readonly url = input.required<string>();

  /** Trusted URL for the iframe */
  protected readonly mapsUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.url()));

  /** External URL to open in new tab if cookies are disabled */
  readonly externalUrl = input.required<string>();

  /** Fallback image URL to show if cookies are disabled */
  readonly fallbackImageUrl = input.required<string>();

  /** Consent service */
  private readonly consentService = inject(ConsentService);

  /** Privacy preferences service */
  protected readonly privacyPreferencesService = inject(PrivacyPreferencesService);

  /** Flag indicating whether marketing cookies are enabled */
  protected readonly enabled = computed(() => this.consentService.isCategoryEnabled(EventCategory.Marketing));
}
