import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { HraCommonModule } from '@hra-ui/common';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { coerceIconList, IconsModule } from '@hra-ui/design-system/icons';

/** Helper component for projecting card actions into the right location */
@Component({
  selector: 'hra-collection-card-action',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardActionComponent {
  /** Whether the actions should be put on the left or right side of the card */
  readonly alignment = input<'left' | 'right'>();
}

/** Design system collection card */
@Component({
  selector: 'hra-collection-card',
  imports: [AssetUrlPipe, HraCommonModule, IconsModule, MatChipsModule],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardComponent {
  /** Card title */
  readonly tagline = input.required<string>();

  /** Image url shown in the card */
  readonly image = input<string>();

  /** Icons shown for collection cards */
  readonly icons = input([], { transform: coerceIconList });

  /** Chips/tags shown for collection cards */
  readonly chips = input<string[]>([]);
}
