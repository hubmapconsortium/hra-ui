import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { z } from 'zod';
import { DashboardComponent } from '../../dashboard/dashboard.model';
import { DashboardOutletComponent } from '../../dashboard/dashboard-outlet.component';

@Component({
  selector: 'hra-dashboard-layout',
  standalone: true,
  imports: [CommonModule, DashboardOutletComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent implements DashboardComponent<typeof DashboardLayoutComponent> {
  static readonly type = 'Dashboard';
  static readonly def = z.object({
    type: z.literal('Dashboard'),
    title: z.string(),
    items: z.any().array(),
  });

  readonly spec = input<z.infer<(typeof DashboardLayoutComponent)['def']>>();
}
