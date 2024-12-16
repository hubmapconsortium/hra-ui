import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { SOCIAL_LINKS, SocialMediaButtonComponent, SocialMediaName } from '@hra-ui/design-system/social-media-button';

/**
 * Component for footer
 */
@Component({
  selector: 'hra-footer',
  imports: [CommonModule, MatIconModule, SocialMediaButtonComponent, AssetUrlPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** HRA Logo url */
  readonly logo = input<string>('assets/logo/hra_logo_contrast.svg');

  /** List of social links to use in the footer */
  protected readonly socialMediaNames = Object.keys(SOCIAL_LINKS) as SocialMediaName[];
}
