import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** An interface of gradient colors along with their percentages for the gradient bar. */
export interface GradientPoint {
  /** Gradient color at a specific percentage */
  color: string;
  /** Percentage point along the gradient bar */
  percentage: number;
}

/** Gradient legend for biomarkers */
@Component({
  selector: 'hra-gradient-legend',
  imports: [CommonModule],
  templateUrl: './gradient-legend.component.html',
  styleUrls: ['./gradient-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientLegendComponent {
  /** Gradient colors along with their stop points */
  @Input() gradient: GradientPoint[] = [];

  /** Computes the css linear-gradient function for the gradient bar */
  get gradientCss(): string {
    const stops = this.gradient.map(({ color, percentage }) => `${color} ${percentage}%`).join(',');
    return `linear-gradient(90deg, ${stops})`;
  }
}
