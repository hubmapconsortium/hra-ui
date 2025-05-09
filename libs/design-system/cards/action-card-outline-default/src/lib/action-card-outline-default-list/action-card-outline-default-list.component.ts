import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ActionCardOutlineDefault } from '../types/action-card-outline-default.schema';
import { ActionCardOutlineDefaultComponent } from '../action-card-outline-default.component';

@Component({
  selector: 'hra-action-card-outline-default-list',
  imports: [CommonModule, ActionCardOutlineDefaultComponent],
  templateUrl: './action-card-outline-default-list.component.html',
  styleUrl: './action-card-outline-default-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardOutlineDefaultListComponent {
  readonly cards = input.required<ActionCardOutlineDefault[]>();
}
