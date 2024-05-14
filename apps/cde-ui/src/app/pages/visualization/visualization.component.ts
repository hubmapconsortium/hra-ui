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
  private readonly vis = viewChild<ElementRef<CdeVisualizationElement>>('vis');

  private readonly dataService = inject(VisualizationDataService);

  constructor() {
    effect(() => {
      const el = this.vis()?.nativeElement;
      if (el) {
        el.nodes = this.dataService.nodes();
        el.colorMap = this.dataService.colorMap();
      }
    });
  }
}
