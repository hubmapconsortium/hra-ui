import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';

/** Alignment options */
export type Alignment = 'left' | 'center';

/**
 * Profile Card for About Page
 */
@Component({
  selector: 'hra-profile-card',
  imports: [HraCommonModule, MatIconModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  /**
   * Field for alignment option
   */
  readonly alignment = input.required<Alignment>();

  /**
   * Field for profile picture URL
   */
  readonly pictureUrl = input.required<string>();

  /**
   * Field for profile name
   */
  readonly name = input.required<string>();

  /**
   * Field for description
   */
  readonly description = input.required<string>();
}
