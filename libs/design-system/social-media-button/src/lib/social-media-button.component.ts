import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/** All CNS links */
const SOCIAL_LINKS: Record<string, string> = {
  x: 'https://twitter.com/cnscenter',
  facebook: 'https://www.facebook.com/cnscenter/',
  instagram: 'https://www.instagram.com/cns_at_iu/',
  youtube: 'https://www.youtube.com/@CNSCenter/',
  linkedin: 'https://www.linkedin.com/company/cns-indiana-university-bloomington',
  email: 'mailto:infoccf@iu.edu',
};

/**
 * Social media buttons for HRA apps
 */
@Component({
  selector: 'hra-social-media-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './social-media-button.component.html',
  styleUrl: './social-media-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaButtonComponent {
  /** Links to use */
  readonly links = SOCIAL_LINKS;
  /** Button name */
  name = input.required<string>();
  /** If the button is small size */
  isSmall = input.required<boolean>();
}
