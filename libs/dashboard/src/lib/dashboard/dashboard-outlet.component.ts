import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardComponentOutletDirective } from './dashboard-outlet.directive';
import { DashboardComponentAnySpec } from './dashboard.model';

@Component({
  selector: 'hra-dashboard-component-outlet',
  template: `<ng-container *hraDashboardComponentOutlet="spec()"></ng-container>`,
  standalone: true,
  imports: [DashboardComponentOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponentOutletComponent {
  readonly spec = input.required<DashboardComponentAnySpec | undefined>();
}
