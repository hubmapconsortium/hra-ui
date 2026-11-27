import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';

/**
 * Covers a chart while its data loads, in the same place as the empty state.
 * Place it in a positioned container next to the chart.
 */
@Component({
  selector: 'cde-chart-skeleton',
  imports: [SkeletonComponent],
  template: '<cde-skeleton shape="rect" />',
  styleUrl: './chart-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartSkeletonComponent {}
