import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SOCIAL_IDS } from '@hra-ui/design-system/buttons/social-media-button';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FundingComponent } from './funding/funding.component';
import { FUNDER_IDS } from './static-data/parsed';

/**
 * CNS footer component
 */
@Component({
  selector: 'cns-footer',
  imports: [
    HraCommonModule,
    MatIconModule,
    BrandModule,
    ButtonsModule,
    FundingComponent,
    MatDividerModule,
    InlineSVGModule,
    LinkDirective,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** List of funders to show */
  readonly funders = input(FUNDER_IDS);
  /** List of social media link to show */
  readonly socials = input(SOCIAL_IDS);
  /** inject Privacy Preference Service */
  private readonly privacyPreferences = inject(PrivacyPreferencesService);

  /** Copyright text (always uses current year) */
  readonly copyrightText = computed(
    () => `© ${new Date().getFullYear()} Cyberinfrastructure for Network Science Center at Indiana University`,
  );

  /** Open Privacy Preferences Modal */
  openPrivacyPreferences(event: Event): void {
    event.preventDefault();
    this.privacyPreferences.openPrivacyPreferences('manage');
  }
}
