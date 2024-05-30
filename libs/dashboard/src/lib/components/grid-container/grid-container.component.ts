import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { z } from 'zod';
import {
  DASHBOARD_COMPONENT_ANY_DEF,
  DashboardComponent,
  DashboardComponentSpecFor,
} from '../../dashboard/dashboard.model';

@Component({
  selector: 'hra-grid-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-container.component.html',
  styleUrl: './grid-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridContainerComponent implements DashboardComponent<typeof GridContainerComponent> {
  static readonly def = z.object({
    type: z.literal('GridContainer'),
    columns: z.number(),
    items: DASHBOARD_COMPONENT_ANY_DEF.array(),
  });

  readonly spec = input.required<DashboardComponentSpecFor<typeof GridContainerComponent>>();
}
