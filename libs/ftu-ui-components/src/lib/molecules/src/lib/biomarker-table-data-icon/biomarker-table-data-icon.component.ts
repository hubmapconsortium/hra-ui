import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Describes the data icon for the table
 */
@Component({
  selector: 'ftu-biomarker-table-data-icon',
  imports: [CommonModule],
  template: '',
  styleUrl: './biomarker-table-data-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.background-color]': 'color',
    '[style.--radius.rem]': 'size',
  },
})
export class BiomarkerTableDataIconComponent {
  /** Represents the color of the icon */
  @Input() color = '';

  /** Represents the size of the icon  */
  @Input() size = 0;
}
