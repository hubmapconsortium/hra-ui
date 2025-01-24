import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconButtonModule, IconButtonSize, IconButtonVariant } from '@hra-ui/design-system/icon-button';
import SOCIAL_MEDIA_DATA from './social-media.json';

/** Social media id */
export type SocialMediaId = keyof typeof SOCIAL_MEDIA_DATA;

/** All available social media ids */
export const SOCIAL_MEDIA_IDS = Object.keys(SOCIAL_MEDIA_DATA) as SocialMediaId[];

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
  /** Social media to display */
  readonly id = input.required<SocialMediaId>();

  /** Button size */
  readonly size = input<IconButtonSize>('large');

  /** Button variant */
  readonly variant = input<IconButtonVariant>('dark');

  /** Social media button data */
  protected readonly data = computed(() => SOCIAL_MEDIA_DATA[this.id()]);

  /** Whether the icon is a font icon or svg icon */
  protected readonly isFontIcon = computed(() => 'isFontIcon' in this.data());
}
