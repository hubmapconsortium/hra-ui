import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { SOCIAL_IDS } from '@hra-ui/design-system/buttons/social-media-button';
import { FundingComponent } from './funding/funding.component';
import { FUNDER_IDS } from './static-data/parsed';

/**
 * Global footer component
 */
@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, BrandModule, ButtonsModule, FundingComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** List of funders to show */
  readonly funders = input(FUNDER_IDS);
  /** List of social media link to show */
  readonly socials = input(SOCIAL_IDS);
}
