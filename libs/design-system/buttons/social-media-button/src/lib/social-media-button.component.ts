import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconButtonModule, IconButtonSize, IconButtonVariant } from '@hra-ui/design-system/buttons/icon-button';
import { SOCIALS } from './static-data/parsed';
import { SocialMediaId } from './types/social-media.schema';

/**
 * Social media buttons for HRA apps
 */
@Component({
  selector: 'hra-social-media-button',
  imports: [CommonModule, IconButtonModule],
  templateUrl: './social-media-button.component.html',
  styleUrl: './social-media-button.component.scss',
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
  protected readonly data = computed(() => {
    const item = SOCIALS.find(({ id }) => this.id() === id);
    if (!item) {
      throw new Error(`No social media with id '${this.id()}'`);
    }

    return item;
  });
}
