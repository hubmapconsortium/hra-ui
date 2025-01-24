import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconButtonModule, IconButtonSize, IconButtonVariant } from '@hra-ui/design-system/icon-button';
import SOCIAL_MEDIA_BUTTON_DATA from './social-media-button.json';

/** Social media name type */
export type SocialMediaName = keyof typeof SOCIAL_MEDIA_BUTTON_DATA;

/** Every social media button name */
export const SOCIAL_MEDIA_NAMES = Object.keys(SOCIAL_MEDIA_BUTTON_DATA) as SocialMediaName[];

/**
 * Social media buttons for HRA apps
 */
@Component({
  selector: 'hra-social-media-button',
  standalone: true,
  imports: [CommonModule, IconButtonModule],
  templateUrl: './social-media-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaButtonComponent {
  /** Button name */
  readonly name = input.required<SocialMediaName>();

  /** Button size */
  readonly size = input<IconButtonSize>('large');

  /** Button variant */
  readonly variant = input<IconButtonVariant>('dark');

  /** Social media button data */
  protected readonly data = computed(() => SOCIAL_MEDIA_BUTTON_DATA[this.name()]);

  /** Whether the icon is a font icon or svg icon */
  protected readonly isFontIcon = computed(() => 'isFontIcon' in this.data());
}
