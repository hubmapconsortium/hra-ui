import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/** Social media name type */
export type SocialMediaName = 'x' | 'facebook' | 'instagram' | 'youtube' | 'linkedin' | 'email' | 'github';
/** Button size type */
export type SocialMediaButtonSize = 'small' | 'large';

/** All CNS links */
export const SOCIAL_LINKS: Record<SocialMediaName, string> = {
  x: 'https://twitter.com/cnscenter',
  facebook: 'https://www.facebook.com/cnscenter/',
  instagram: 'https://www.instagram.com/cns_at_iu/',
  youtube: 'https://www.youtube.com/@CNSCenter/',
  linkedin: 'https://www.linkedin.com/company/cns-indiana-university-bloomington',
  email: 'mailto:infoccf@iu.edu',
  github: 'https://github.com/hubmapconsortium/hra-ui',
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
  /** Button name */
  readonly name = input.required<SocialMediaName>();

  /** Button size */
  readonly size = input.required<SocialMediaButtonSize>();

  /** Icon to display */
  protected icon = computed(() => `social:${this.name()}`);

  /** External link for button */
  protected link = computed(() => SOCIAL_LINKS[this.name()]);
}
