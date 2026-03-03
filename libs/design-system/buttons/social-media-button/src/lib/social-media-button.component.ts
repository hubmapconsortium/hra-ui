import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { findOrThrow } from '@hra-ui/common/array-util';
import { IconButtonModule, IconButtonSize, IconButtonVariant } from '@hra-ui/design-system/buttons/icon-button';
import { injectSocials } from './socials';
import { SocialMediaId } from './types/social-media.schema';

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

  private readonly socials = injectSocials();

  /** Social media button data */
  protected readonly data = computed(() => findOrThrow(this.socials, ({ id }) => id === this.id()));
}
