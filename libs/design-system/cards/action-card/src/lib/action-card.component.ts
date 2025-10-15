import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { HraCommonModule } from '@hra-ui/common';
import { coerceIconList, IconsModule } from '@hra-ui/design-system/icons';
import { ActionCardVariant } from './action-card.schema';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatChipsModule } from '@angular/material/chips';

/** Helper component for projecting card actions into the right location */
@Component({
  selector: 'hra-action-card-action',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardActionComponent {
  /** Whether the actions should be put on the left or right side of the card */
  readonly alignment = input<'left' | 'right'>();
}

/**
 * Design system action card
 * The card consists of an image on top (or icons for the `outlined-with-icons` variant)
 * followed by a title and content and optionally actions
 */
@Component({
  selector: 'hra-action-card',
  imports: [HraCommonModule, MatDividerModule, IconsModule, ButtonsModule, MatChipsModule],
  templateUrl: './action-card.component.html',
  styleUrl: './action-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"hra-action-card-variant-" + variant()',
  },
})
export class ActionCardComponent {
  /** Card layout variant */
  readonly variant = input.required<ActionCardVariant>();
  /** Title */
  readonly tagline = input.required<string>();
  /** Smaller title show above the primary title for `elevated` cards */
  readonly subtagline = input<string>();
  /** Image url show on top except for `outlined-with-icons` cards */
  readonly image = input<string>();
  /** Icons shown for `outlined-with-icons` cards */
  readonly icons = input([], { transform: coerceIconList });
  /** Tags to display on bottom of card (only on content variant) */
  readonly tags = input<string[]>([]);
  /** Link when clicked (only on content variant) */
  readonly link = input<string>();

  /**
   * Navigate to the given link in a new tab
   * @param url Link to navigate to
   */
  navigateToLink(url: string | undefined) {
    if (url) {
      window.open(url, '_blank', 'noopener');
    }
  }
}
