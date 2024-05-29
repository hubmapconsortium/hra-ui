import { Injectable, Signal, inject, signal } from '@angular/core';
import { CanActivateFn, NavigationExtras, ResolveFn, Router } from '@angular/router';
import { CdeVisualizationElementProps } from '@hra-ui/cde-visualization';

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

export function visualizationDataResolver(): ResolveFn<Partial<CdeVisualizationElementProps>> {
  return () => inject(VisualizationDataService).getData()() as Partial<CdeVisualizationElementProps>;
}

@Injectable({
  providedIn: 'root',
})
export class VisualizationDataService {
  private readonly data = signal<Partial<CdeVisualizationElementProps> | undefined>(undefined);

  setData(data: Partial<CdeVisualizationElementProps>): void {
    this.data.set(data);
  }

  getData(): Signal<Partial<CdeVisualizationElementProps> | undefined> {
    return this.data.asReadonly();
  }

  clearData(): void {
    this.data.set(undefined);
  }
}
