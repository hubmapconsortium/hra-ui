import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GradientPoint {
  percentage: number;
  color: string;
  // value: string;
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
  constructor() {
    this.gradient = [{ color: '#63B1D3', percentage: 100 }];
    this.updateGradient();
  }

  @Input()
  gradient: GradientPoint[] = [];

  newGradient = ' ';

  private updateGradient(): void {
    const stops = this.gradient.map(({ percentage, color }) => `${color} ${percentage}%`).join(',');
    this.newGradient = `linear-gradient(to right, ${stops})`;
    console.log(this.newGradient);
  }
}
