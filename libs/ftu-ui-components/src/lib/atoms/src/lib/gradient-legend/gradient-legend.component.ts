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
  selector: 'ftu-gradient-legend',
  imports: [CommonModule],
  templateUrl: './gradient-legend.component.html',
  styleUrl: './gradient-legend.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientLegendComponent {
  /** Gradient colors along with their stop points */
  @Input() gradient: GradientPoint[] = [];

  /** Smallest mean expression value in the current view, shown at the start of the bar */
  @Input() minExpression?: number;

  /** Largest mean expression value in the current view, shown at the end of the bar */
  @Input() maxExpression?: number;

  /** Label displayed at the start of the gradient bar */
  get startLabel(): string {
    return this.formatExpression(this.minExpression, '0.0');
  }

  /** Label displayed at the end of the gradient bar */
  get endLabel(): string {
    return this.formatExpression(this.maxExpression, '1.0');
  }

  /** Computes the css linear-gradient function for the gradient bar */
  get gradientCss(): string {
    const stops = this.gradient.map(({ color, percentage }) => `${color} ${percentage}%`).join(',');
    return `linear-gradient(90deg, ${stops})`;
  }

  /**
   * Formats an expression value with 3 decimal places
   * @param value Expression value
   * @param fallback Label used when the value is undefined
   * @returns The formatted label
   */
  private formatExpression(value: number | undefined, fallback: string): string {
    return value === undefined ? fallback : value.toFixed(3);
  }
}
