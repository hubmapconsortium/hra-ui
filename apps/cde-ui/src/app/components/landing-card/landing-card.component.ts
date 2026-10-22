import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { IconData, IconsModule } from '@hra-ui/design-system/icons';

/** Link shown on a landing card */
export interface LandingCardLink {
  /** Link text */
  label: string;
  /** Internal route or external url */
  url: string;
  /** Whether the link opens in a new tab */
  external?: boolean;
}

/** Landing card data */
export interface LandingCard {
  /** Card title */
  title: string;
  /** One sentence describing the destination */
  description?: string;
  /** Image url */
  image?: string;
  /** Icon shown when the card has no image */
  icon?: IconData;
  /** Destination of the whole card */
  action: LandingCardLink;
  /** Optional additional link */
  secondaryAction?: LandingCardLink;
}

/**
 * Landing page card where the entire card links to a single destination.
 * An optional secondary link stays separately clickable.
 */
@Component({
  selector: 'cde-landing-card',
  imports: [HraCommonModule, LinkDirective, MatIconModule, IconsModule],
  templateUrl: './landing-card.component.html',
  styleUrl: './landing-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingCardComponent {
  /** Card data */
  readonly card = input.required<LandingCard>();
}
