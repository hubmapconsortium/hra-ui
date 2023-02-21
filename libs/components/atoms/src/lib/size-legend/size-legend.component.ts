import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Interface for taking input of the label and radius of the circles to be displayed.
 */
interface SizeLegend {
  label: string;
  radius: number;
}
/**
 * size-legend component for use under the biomarkers.
 */
@Component({
  selector: 'hra-size-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-legend.component.html',
  styleUrls: ['./size-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeLegendComponent {
  /**
   * Input for sizes and labels of circles to be displayed.
   */
  @Input() sizes: SizeLegend[] = [];
}
