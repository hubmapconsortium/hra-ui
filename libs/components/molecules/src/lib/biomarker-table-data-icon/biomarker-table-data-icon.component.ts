import { ChangeDetectionStrategy, Component, Host, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-biomarker-table-data-icon',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styleUrls: ['./biomarker-table-data-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableDataIconComponent {
  @HostBinding('style.background-color') @Input() color = '';
  // TODO
  @Input() size = 0;
}
