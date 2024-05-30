import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../dashboard/dashboard.model';
import { z } from 'zod';
import { TitleCardComponent } from '../title-card/title-card.component';

@Component({
  selector: 'hra-image-container',
  standalone: true,
  imports: [CommonModule, TitleCardComponent],
  templateUrl: './image-container.component.html',
  styleUrl: './image-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageContainerComponent implements DashboardComponent<typeof ImageContainerComponent> {
  static readonly type = 'ImageContainer';
  static readonly def = z.object({
    type: z.literal('ImageContainer'),
    title: z.string(),
    tooltip: z.string(),
    imageUrl: z.string(),
  });

  readonly spec = input<z.infer<(typeof ImageContainerComponent)['def']>>();
}
