import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GradientPoint {
  percentage: number;
  color: string;
}

@Component({
  selector: 'hra-gradient-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gradient-legend.component.html',
  styleUrls: ['./gradient-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientLegendComponent {
  /** Input array of GradientPoint interface consisting of  color and its corresponding percentage */
  @Input() gradient: GradientPoint[] = [];

  /** Getter function to update the linear gradient */
  get gradientCss(): string {
    const stops = this.gradient.map(({ percentage, color }) => `${color} ${percentage}%`).join(',');
    return `linear-gradient(270deg, ${stops})`;
  }
}
