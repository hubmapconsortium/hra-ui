import { EnvironmentProviders, Injectable, InjectionToken, inject, makeEnvironmentProviders } from '@angular/core';
import { DashboardComponentSpecAny, DashboardComponentTypeAny } from './dashboard.model';

const COMPONENTS_TOKEN = new InjectionToken<DashboardComponentTypeAny[][]>('Dashboard components');

export function provideDashboardComponents(components: DashboardComponentTypeAny[]): EnvironmentProviders {
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
  private readonly registry = new Map<string, DashboardComponentTypeAny>();

  constructor() {
    const components = inject(COMPONENTS_TOKEN).flat();
    for (const component of components) {
      this.registry.set(component.type, component);
    }
  }

  getComponent(spec: DashboardComponentSpecAny): DashboardComponentTypeAny | undefined {
    return this.registry.get(spec.type);
  }
}
