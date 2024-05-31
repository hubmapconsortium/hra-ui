import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import '@hra-ui/cde-visualization';
import { CdeVisualizationElement } from '@hra-ui/cde-visualization';
import { VisualizationDataService } from '../../services/visualization-data-service/visualization-data-service.service';

/**
 * Visualization page component
 */
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
  /** Reference to visualization DOM element */
  private readonly vis = viewChild<ElementRef<CdeVisualizationElement>>('vis');

  /** Visualization data service */
  private readonly dataService = inject(VisualizationDataService);

  /**
   * Add nodes, edges, and color data to visualization on load
   */
  constructor() {
    effect(() => {
      const el = this.vis()?.nativeElement;
      if (el) {
        el.nodes = this.dataService.nodes();
        el.edges = this.dataService.edges();
        el.colorMap = this.dataService.colorMap();
      }
    });
  }
}
