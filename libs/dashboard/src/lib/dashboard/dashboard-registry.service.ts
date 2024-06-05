import { EnvironmentProviders, Injectable, InjectionToken, inject, makeEnvironmentProviders } from '@angular/core';
import { DashboardComponentAnyClass, DashboardComponentAnySpec, typeFor } from './dashboard.model';

const COMPONENTS_TOKEN = new InjectionToken<DashboardComponentAnyClass[][]>('Dashboard components');

export function provideDashboardComponents(components: DashboardComponentAnyClass[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: COMPONENTS_TOKEN,
      useValue: components,
      multi: true,
    },
  ]);
}

@Injectable({
  providedIn: 'root',
})
export class DashboardComponentRegistryService {
  private readonly components = inject(COMPONENTS_TOKEN).flat();
  private readonly registry = new Map(this.components.map((component) => [typeFor(component), component]));

  componentFor(spec: DashboardComponentAnySpec): DashboardComponentAnyClass | undefined {
    return this.registry.get(spec.type);
  }
}
