import { inject, Injectable, Signal, signal } from '@angular/core';
import { CanActivateFn, NavigationExtras, ResolveFn, Router } from '@angular/router';
import { CdeVisualizationElementProps } from '@hra-ui/cde-visualization';

/** Visualization data type */
export type VisualizationData = Partial<CdeVisualizationElementProps>;

/** Returns true if data is available, otherwise instructs router to navigate to a different route */
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

/**
 * Visualization data resolver
 * @returns Function to inject visualization data service and invoke getData function
 */
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
  /** Visualization data */
  private readonly data = signal<VisualizationData | undefined>(undefined);

  /** Sets data */
  setData(data: VisualizationData): void {
    this.data.set(data);
  }

  /** Gets data */
  getData(): Signal<VisualizationData | undefined> {
    return this.data.asReadonly();
  }

  /** Clears data */
  clearData(): void {
    this.data.set(undefined);
  }
}
