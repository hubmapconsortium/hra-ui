import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { MarkdownModule } from 'ngx-markdown';

/**
 * Profile Card for displaying user information and relevant links
 */
@Component({
  selector: 'hra-profile-card',
  imports: [HraCommonModule, MatIconModule, MarkdownModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hra-profile-card-center-content]': 'centerContent()',
  },
})
export class ProfileCardComponent {
  /** Field for profile picture URL */
  readonly pictureUrl = input.required<string>();

  /** Field for profile name */
  readonly name = input.required<string>();

  /** Field for description */
  readonly description = input.required<string>();

  /** Whether to center card content */
  readonly centerContent = input(false, { transform: booleanAttribute });
}
