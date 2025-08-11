import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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
  selector: 'ftu-size-legend',
  imports: [CommonModule],
  templateUrl: './size-legend.component.html',
  styleUrls: ['./size-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeLegendComponent {
  /** Taking input for the radius of the circle and the label to be displayed. */
  sizes = input<SizeLegend[]>([]);

  /** Filtered sizes of size legend component */
  filteredSizes = computed(() => this.sizes().filter((size) => size.label !== '25%' && size.label !== '75%'));
}
