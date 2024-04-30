import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HistogramComponent } from '../histogram/histogram.component';

@Component({
  selector: 'cde-cde-visualization',
  standalone: true,
  imports: [CommonModule, HistogramComponent],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdeVisualizationComponent {}
