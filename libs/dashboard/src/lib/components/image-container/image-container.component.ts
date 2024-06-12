import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponent, DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../title-card/title-card.component';

/** Image container component, renders image inside a card */
@Component({
  selector: 'hra-image-container',
  standalone: true,
  imports: [CommonModule, TitleCardComponent],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageContainerComponent implements DashboardComponent<typeof ImageContainerComponent> {
  /** Input type for Image container component */
  static readonly def = TITLE_CARD_DEF.extend({
    type: z.literal('ImageContainer'),
    imageUrl: z.string(),
    aspectRatio: z.string().default('4/3'),
  });

  /** Input for image container component */
  readonly spec = input.required<DashboardComponentSpecFor<typeof ImageContainerComponent>>();
}
