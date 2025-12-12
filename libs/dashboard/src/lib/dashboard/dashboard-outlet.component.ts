import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardComponentOutletDirective } from './dashboard-outlet.directive';
import { DashboardComponentAnySpec } from './dashboard.model';

/** Dashboard component outlet component */
@Component({
  selector: 'hra-dashboard-component-outlet',
  imports: [DashboardComponentOutletDirective],
  template: `<ng-container *hraDashboardComponentOutlet="spec()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponentOutletComponent {
  /** Input for dashboard component outlet component */
  readonly spec = input.required<DashboardComponentAnySpec | undefined>();
}
