import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { MatDividerModule } from '@angular/material/divider';
import { HraCommonModule } from '@hra-ui/common';
import { coerceIconList, IconsModule } from '@hra-ui/design-system/icons';
import { ActionCardVariant } from './action-card.schema';

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
  imports: [AssetUrlPipe, HraCommonModule, MatDividerModule, IconsModule],
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
  /** Gallery variant: date to display */
  readonly date = input<string>();
  /** Gallery variant: URL for the tagline link */
  readonly taglineUrl = input<string>();
  /** Gallery variant: whether the link opens in new tab */
  readonly taglineExternal = input<boolean>(false);
  /** Gallery variant: category tag */
  readonly categoryTag = input<string>();
  /** Gallery variant: project tag */
  readonly projectTag = input<string>();
  /** Gallery variant: alt text for image */
  readonly imageAlt = input<string>('');
}
