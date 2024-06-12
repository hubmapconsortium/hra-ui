import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponentOutletDirective } from '../../dashboard/dashboard-outlet.directive';
import {
  DASHBOARD_COMPONENT_ANY_DEF,
  DashboardComponent,
  DashboardComponentSpecFor,
} from '../../dashboard/dashboard.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Dashboard Layout component
 */
@Component({
  selector: 'hra-dashboard-layout',
  standalone: true,
  imports: [CommonModule, DashboardComponentOutletDirective, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent implements DashboardComponent<typeof DashboardLayoutComponent> {
  /** Input type for Dashboard Layout Component */
  static readonly def = z.object({
    type: z.literal('Dashboard'),
    title: z.string(),
    description: z.string(),
    link: z.object({
      type: z.string().optional(),
      url: z.string(),
      label: z.string(),
    }),
    items: DASHBOARD_COMPONENT_ANY_DEF.array(),
  });

  /** Input for dashboard layout component */
  readonly spec = input.required<DashboardComponentSpecFor<typeof DashboardLayoutComponent>>();
}
