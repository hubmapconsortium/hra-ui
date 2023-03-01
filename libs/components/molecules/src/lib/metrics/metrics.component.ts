import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
  An interface representing a single metric with an icon, value and description.
 */
export interface MetricItem {
  /** Represents the icon associated with the metric. */
  icon: string;
  /** Describes the numberical value of the metric. */
  value: string;
  /** Describes the type of metric. */
  description: string;
}
/**
 * Describes the metrics for the HuBMAP project.
 */
@Component({
  selector: 'hra-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsComponent {
  /** Main title of metrics component. */
  @Input() title = '';

  /** Logo of metrics component. */
  @Input() logo = '';

  /** List of metrics that will be shown to the user. */
  @Input() metrics: MetricItem[] = [];
}
