import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Describes the data icon for the table
 */
@Component({
  selector: 'hra-biomarker-table-data-icon',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styleUrls: ['./biomarker-table-data-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableDataIconComponent {
  /** Represents the color of the icon */
  @HostBinding('style.background-color') @Input() color = '';

  /** Represents the size of the icon  */
  @HostBinding('style.--radius.rem') @Input() size = 0;
}
