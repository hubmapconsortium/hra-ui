import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrandLogoComponent } from '@hra-ui/design-system/brand/logo';
import { SOCIAL_MEDIA_IDS, SocialMediaButtonComponent } from '@hra-ui/design-system/social-media-button';
import { FUNDER_IDS, FundingComponent } from './funding/funding.component';

/**
 * Global footer component
 */
@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, BrandLogoComponent, SocialMediaButtonComponent, FundingComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** List of funders to show */
  readonly funders = input(FUNDER_IDS);
  /** List of social media link to show */
  readonly socials = input(SOCIAL_MEDIA_IDS);
}
