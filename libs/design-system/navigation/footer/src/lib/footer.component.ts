import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { MatIconModule } from '@angular/material/icon';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SOCIAL_IDS } from '@hra-ui/design-system/buttons/social-media-button';
import { FundingComponent } from './funding/funding.component';
import { FUNDER_IDS } from './static-data/parsed';
import { MatDividerModule } from '@angular/material/divider';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';

/**
 * Global footer component
 */
@Component({
  selector: 'hra-footer',
  imports: [HraCommonModule, MatIconModule, BrandModule, ButtonsModule, FundingComponent, MatDividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** List of funders to show */
  readonly funders = input(FUNDER_IDS);
  /** List of social media link to show */
  readonly socials = input(SOCIAL_IDS);

  private readonly privacyPreferences = inject(PrivacyPreferencesService);

  openPrivacyPreferences(event: Event): void {
    event.preventDefault();
    this.privacyPreferences.openPrivacyPreferences('manage');
  }
}
