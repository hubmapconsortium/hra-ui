import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { IconButtonModule, IconButtonSize, IconButtonVariant } from '@hra-ui/design-system/buttons/icon-button';
import { SOCIALS } from './static-data/parsed';
import { SocialMediaId } from './types/social-media.schema';
import { findOrThrow } from '@hra-ui/common/array-util';

/**
 * Social media buttons for HRA apps
 */
@Component({
  selector: 'hra-social-media-button',
  imports: [HraCommonModule, IconButtonModule],
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
  protected readonly data = computed(() => findOrThrow(SOCIALS, ({ id }) => id === this.id()));
}
