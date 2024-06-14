import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { z } from 'zod';
import {
  DASHBOARD_COMPONENT_ANY_DEF,
  DashboardComponent,
  DashboardComponentSpecFor,
} from '../../dashboard/dashboard.model';
import { DashboardComponentOutletDirective } from '../../dashboard/dashboard-outlet.directive';

/** Grid Container Component. Renders items based on number of columns provided */
@Component({
  selector: 'hra-grid-container',
  standalone: true,
  imports: [CommonModule, DashboardComponentOutletDirective],
  templateUrl: './grid-container.component.html',
  styleUrl: './grid-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridContainerComponent implements DashboardComponent<typeof GridContainerComponent> {
  /** Input type for Grid container component */
  static readonly def = z.object({
    type: z.literal('GridContainer'),
    columns: z.number(),
    items: DASHBOARD_COMPONENT_ANY_DEF.array(),
  });

  /** Input for grid container component */
  readonly spec = input.required<DashboardComponentSpecFor<typeof GridContainerComponent>>();

  /** Style for grid container based on number of columns */
  readonly columns = computed(() => `repeat(${this.spec().columns}, 1fr)`);
}
