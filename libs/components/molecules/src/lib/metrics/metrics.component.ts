import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsComponent {}
