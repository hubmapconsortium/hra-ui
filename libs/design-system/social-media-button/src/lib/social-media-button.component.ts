import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  IconButtonSize,
  IconButtonSizeDirective,
  IconButtonVariant,
  IconButtonVariantDirective,
} from '@hra-ui/design-system/icon-button';

/** Social media name type */
export type SocialMediaName = 'x' | 'facebook' | 'instagram' | 'youtube' | 'linkedin' | 'email' | 'github';

/** All CNS links */
export const SOCIAL_LINKS: Record<SocialMediaName, string> = {
  x: 'https://twitter.com/cnscenter',
  facebook: 'https://www.facebook.com/cnscenter/',
  instagram: 'https://www.instagram.com/cns_at_iu/',
  youtube: 'https://www.youtube.com/@CNSCenter/',
  linkedin: 'https://www.linkedin.com/company/cns-indiana-university-bloomington',
  github: 'https://github.com/hubmapconsortium/hra-ui',
  email: 'mailto:infoccf@iu.edu',
};

/**
 * Social media buttons for HRA apps
 */
@Component({
  selector: 'hra-social-media-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, IconButtonVariantDirective, IconButtonSizeDirective],
  templateUrl: './social-media-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaButtonComponent {
  /** Button name */
  readonly name = input.required<SocialMediaName>();

  /** Button size */
  readonly size = input<IconButtonSize>('large');

  /** Button variant */
  readonly variant = input<IconButtonVariant>('default');

  /** Icon to display */
  protected icon = computed(() => `social:${this.name()}`);

  /** External link for button */
  protected link = computed(() => SOCIAL_LINKS[this.name()]);
}
