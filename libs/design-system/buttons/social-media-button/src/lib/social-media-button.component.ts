import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconButtonModule, IconButtonSize, IconButtonVariant } from '@hra-ui/design-system/icon-button';
import { SocialMediaId } from './types/social-media.schema';
import { SOCIALS } from './static-data/parsed';

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
  protected readonly data = computed(() => {
    const item = SOCIALS.find(({ id }) => this.id() === id);
    if (!item) {
      throw new Error(`No social media with id '${this.id()}'`);
    }

    return item;
  });
}
