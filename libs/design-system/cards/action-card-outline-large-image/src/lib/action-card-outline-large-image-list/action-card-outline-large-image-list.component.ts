import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';

import { ActionCardOutlineLargeImageComponent } from '../action-card-outline-large-image.component';
import { ActionCardOutlineLargeImage } from '../types/action-card-outline-large-image.schema';

/**
 * A group of outline large image cards
 */
@Component({
  selector: 'hra-action-card-outline-large-image-list',
  imports: [HraCommonModule, ActionCardOutlineLargeImageComponent],
  templateUrl: './action-card-outline-large-image-list.component.html',
  styleUrl: './action-card-outline-large-image-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardOutlineLargeImageListComponent {
  /** Card list */
  readonly cards = input.required<ActionCardOutlineLargeImage[]>();
}
