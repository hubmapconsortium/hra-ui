import { EnvironmentProviders, Injectable, InjectionToken, inject, makeEnvironmentProviders } from '@angular/core';
import { DashboardComponentAnyClass, DashboardComponentAnySpec, typeFor } from './dashboard.model';

/** Injection token for dashboard components */
const COMPONENTS_TOKEN = new InjectionToken<DashboardComponentAnyClass[][]>('Dashboard components');

/**
 * Provides the dashboard components as environment providers
 * @param components - Array of dashboard component classes
 * @returns EnvironmentProviders - The created environment providers
 */
export function provideDashboardComponents(components: DashboardComponentAnyClass[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: COMPONENTS_TOKEN,
      useValue: components,
      multi: true,
    },
  ]);
}

/**
 * Service to manage and retrieve dashboard components
 */
@Injectable({
  providedIn: 'root',
})
export class DashboardComponentRegistryService {
  /** Flattens and injects the provided dashboard components */
  private readonly components = inject(COMPONENTS_TOKEN).flat();

  /** Creates a registry map of component types to component classes */
  private readonly registry = new Map(this.components.map((component) => [typeFor(component), component]));

  /**
   * Retrieves the component class for the given specification
   * @param spec - The dashboard component specification
   * @returns DashboardComponentAnyClass | undefined - The matching component class or undefined if not found
   */
  componentFor(spec: DashboardComponentAnySpec): DashboardComponentAnyClass | undefined {
    return this.registry.get(spec.type);
  }
}
