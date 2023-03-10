import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Defining the input data types for the radius and label to be displayed. */
export interface SizeLegend {
  /** Label under circle */
  label: string;
  /** Radius for cirlce */
  radius: number;
}

/** Size legend component for the biomarkers table. */
@Component({
  selector: 'hra-size-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './size-legend.component.html',
  styleUrls: ['./size-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeLegendComponent {
  /** Taking input for the radius of the circle and the label to be displayed. */
  @Input() sizes: SizeLegend[] = [];
}
