import { Injectable, Signal, inject, signal } from '@angular/core';
import { CanActivateFn, NavigationExtras, ResolveFn, Router } from '@angular/router';
import { CdeVisualizationElementProps } from '@hra-ui/cde-visualization';

export type VisualizationData = Partial<CdeVisualizationElementProps>;

export function visualizationDataCanActivate(
  commands: unknown[] = ['/'],
  navigationExtras?: NavigationExtras,
): CanActivateFn {
  return () => {
    const data = inject(VisualizationDataService).getData()();
    if (data) {
      return true;
    }

    const router = inject(Router);
    return router.createUrlTree(commands, navigationExtras);
  };
}

export function visualizationDataResolver(): ResolveFn<VisualizationData> {
  return () => inject(VisualizationDataService).getData()() as VisualizationData;
}

/**
 * Visualization data service
 */
@Injectable({
  providedIn: 'root',
})
export class VisualizationDataService {
  private readonly data = signal<VisualizationData | undefined>(undefined);

  setData(data: VisualizationData): void {
    this.data.set(data);
  }

  getData(): Signal<VisualizationData | undefined> {
    return this.data.asReadonly();
  }

  clearData(): void {
    this.data.set(undefined);
  }
}
