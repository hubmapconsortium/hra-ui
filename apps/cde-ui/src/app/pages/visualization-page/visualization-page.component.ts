import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationHeaderComponent } from '../../components/visualization-header/visualization-header.component';

/**
 * Component for visualization page
 */
@Component({
  selector: 'cde-visualization-page',
  standalone: true,
  imports: [CommonModule, VisualizationHeaderComponent],
  templateUrl: './visualization-page.component.html',
  styleUrl: './visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizationPageComponent {}
