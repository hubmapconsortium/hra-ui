import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

import {
  SOCIAL_LINKS,
  SocialMediaButtonComponent,
  SocialMediaName,
} from '../../../social-media-button/src/lib/social-media-button.component';

/** Below this size, use smaller logo */
const SMALL_LOGO_THRESHOLD = 768;

/**
 * Component for footer
 */
@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, SocialMediaButtonComponent, AssetUrlPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** HRA Logo url */
  readonly logo = input<string>('assets/logo/hra_logo_contrast.svg');

  /** Use the smaller HRA logo when screen is smaller */
  useSmallerLogo = false;

  socialLinks: SocialMediaName[];

  /**
   * Sets initial values for isExtraSmall and useSmallerLogo
   */
  constructor() {
    this.onResize();
    this.socialLinks = Object.keys(SOCIAL_LINKS) as SocialMediaName[];
  }

  /**
   * Updates isExtraSmall and useSmallerLogo on screen resize
   */
  @HostListener('window:resize')
  onResize() {
    this.useSmallerLogo = window.innerWidth < SMALL_LOGO_THRESHOLD;
  }
}
