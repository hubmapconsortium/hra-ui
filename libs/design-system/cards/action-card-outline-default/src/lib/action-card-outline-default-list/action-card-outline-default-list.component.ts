import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';

import { ActionCardOutlineDefaultComponent } from '../action-card-outline-default.component';
import { ActionCardOutlineDefault } from '../types/action-card-outline-default.schema';

/**
 * A group of outline default cards
 */
@Component({
  selector: 'hra-action-card-outline-default-list',
  imports: [HraCommonModule, ActionCardOutlineDefaultComponent],
  templateUrl: './action-card-outline-default-list.component.html',
  styleUrl: './action-card-outline-default-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardOutlineDefaultListComponent {
  /** Cards to display */
  readonly cards = input.required<ActionCardOutlineDefault[]>();
}
