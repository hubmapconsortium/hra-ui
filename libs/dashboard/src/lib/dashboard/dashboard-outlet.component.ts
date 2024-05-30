import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DashboardComponentRegistryService } from './dashboard-registry.service';
import { DashboardComponentAnySpec } from './dashboard.model';

@Component({
  selector: 'hra-dashboard-outlet',
  template: `<ng-container *ngComponentOutlet="component(); inputs: inputs()"></ng-container>`,
  standalone: true,
  imports: [NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardOutletComponent {
  readonly spec = input<DashboardComponentAnySpec>();

  protected readonly component = computed(() => {
    const spec = this.spec();
    const component = spec && this.registry.componentFor(spec);
    return component ?? null;
  });

  protected readonly inputs = computed(() => ({ spec: this.spec() }));

  private readonly registry = inject(DashboardComponentRegistryService);
}
