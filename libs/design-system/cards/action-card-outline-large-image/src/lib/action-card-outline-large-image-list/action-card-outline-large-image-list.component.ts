import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ActionCardOutlineLargeImageComponent } from '../action-card-outline-large-image.component';
import { ActionCardOutlineLargeImage } from '../types/action-card-outline-large-image.schema';

@Component({
  selector: 'hra-action-card-outline-default-list',
  imports: [CommonModule, ActionCardOutlineLargeImageComponent],
  templateUrl: './action-card-outline-large-image-list.component.html',
  styleUrl: './action-card-outline-large-image-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCardOutlineLargeImageListComponent {
  readonly cards = input.required<ActionCardOutlineLargeImage[]>();
}
