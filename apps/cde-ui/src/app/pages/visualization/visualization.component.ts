import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  viewChild,
} from '@angular/core';
import '@hra-ui/cde-visualization';
import { CdeVisualizationElement, CdeVisualizationElementProps } from '@hra-ui/cde-visualization';

@Component({
  selector: 'cde-visualization-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VisualizationPageComponent {
  readonly data = input<Partial<CdeVisualizationElementProps>>();
  readonly isCustomVisualization = input<boolean>();

  private readonly vis = viewChild.required<ElementRef<CdeVisualizationElement>>('vis');

  protected readonly dataBindRef = effect(() => {
    const el = this.vis().nativeElement;
    for (const [key, value] of Object.entries(this.data() ?? {})) {
      const oldValue = el[key as never] as unknown;
      if (value !== oldValue) {
        el[key as never] = value as never;
      }
    }
  });

  protected beforeUnloadRef = effect((onCleanup) => {
    if (this.isCustomVisualization()) {
      const handler = (event: Event) => event.preventDefault();
      window.addEventListener('beforeunload', handler);
      onCleanup(() => window.removeEventListener('beforeunload', handler));
    }
  });
}
