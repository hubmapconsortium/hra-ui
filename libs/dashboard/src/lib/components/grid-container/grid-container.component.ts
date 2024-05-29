import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { z } from 'zod';
import { DashboardComponent } from '../../dashboard/dashboard.model';

@Component({
  selector: 'hra-grid-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-container.component.html',
  styleUrl: './grid-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridContainerComponent implements DashboardComponent<typeof GridContainerComponent> {
  static readonly type = 'GridContainer';
  static readonly def = z.object({
    type: z.literal('GridContainer'),
    columns: z.number(),
    items: z.any().array(),
  });

  readonly spec = input<z.infer<(typeof GridContainerComponent)['def']>>();
}
