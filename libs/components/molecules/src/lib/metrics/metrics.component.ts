import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export interface MetricItem {
  icon: string;
  description: string;
  value: string;
}

@Component({
  selector: "hra-metrics",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./metrics.component.html",
  styleUrls: ["./metrics.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsComponent {
  /**
   * Input  Title of metrics component
   */
  @Input() title = "";

  /**
   * Input  Logo of metrics component
   */
  @Input() logo = "";

  /**
   * Input  List of metrics component
   */
  @Input() metrics: MetricItem[] = [];
}
