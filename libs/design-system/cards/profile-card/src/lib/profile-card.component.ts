import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { MarkdownModule } from 'ngx-markdown';

import { ProfileCardButton } from './types/profile-card.schema';

/** Alignment options */
export type Alignment = 'left' | 'center';

/**
 * Profile Card for displaying user information and relevant links
 */
@Component({
  selector: 'hra-profile-card',
  imports: [HraCommonModule, MatIconModule, MarkdownModule, TextHyperlinkDirective],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  /** Field for alignment option */
  readonly alignment = input<Alignment>();

  /** Field for profile picture URL */
  readonly pictureUrl = input.required<string>();

  /** Field for profile name */
  readonly name = input.required<string>();

  /** Field for description */
  readonly description = input.required<string>();

  /** Action info for profile card button */
  readonly action = input<ProfileCardButton>();
}
