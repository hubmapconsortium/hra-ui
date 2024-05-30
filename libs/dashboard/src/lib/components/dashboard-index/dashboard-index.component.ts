import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponent, DashboardComponentSpecFor } from '../../dashboard/dashboard.model';

@Component({
  selector: 'hra-dashboard-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-index.component.html',
  styleUrl: './dashboard-index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardIndexComponent implements DashboardComponent<typeof DashboardIndexComponent> {
  static readonly def = z.object({
    type: z.literal('DashboardIndex'),
    items: z
      .object({
        title: z.string(),
        route: z.string(),
        background: z.string().url(),
        url: z.string().url(),
      })
      .array(),
  });

  readonly spec = input.required<DashboardComponentSpecFor<typeof DashboardIndexComponent>>();
}
