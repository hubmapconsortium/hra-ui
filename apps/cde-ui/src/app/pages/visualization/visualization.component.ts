import { CommonModule, Location } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { CdeVisualizationElement, CdeVisualizationElementProps } from '@hra-ui/cde-visualization';

/**
 * Visualization page component
 */
@Component({
  selector: 'cde-visualization-page',
  imports: [CommonModule],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VisualizationPageComponent {
  /** Data for visualization page */
  readonly data = input<Partial<CdeVisualizationElementProps>>();
  /** If the visualization is custom */
  readonly isCustomVisualization = input<boolean>();

  /** Visualization element reference */
  private readonly vis = viewChild.required<ElementRef<CdeVisualizationElement>>('vis');

  /** Service for handling external urls */
  private readonly location = inject(Location);
  /** Link to CDE home page */
  protected readonly homeLink = this.location.prepareExternalUrl('/');

  /** Binds the input data to the corresponding values in the visualization element */
  protected readonly dataBindRef = effect(() => {
    const el = this.vis().nativeElement;
    for (const [key, value] of Object.entries(this.data() ?? {})) {
      const oldValue = el[key as never] as unknown;
      if (value !== oldValue) {
        el[key as never] = value as never;
      }
    }
  });

  /** Sets up an event listener for the beforeunload event that prevents the page from unloading if the current class is a custom visualization */
  protected beforeUnloadRef = effect((onCleanup) => {
    if (this.isCustomVisualization()) {
      const handler = (event: Event) => event.preventDefault();
      window.addEventListener('beforeunload', handler);
      onCleanup(() => window.removeEventListener('beforeunload', handler));
    }
  });
}
