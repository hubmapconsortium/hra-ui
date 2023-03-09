import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-biomarker-table-data-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './biomarker-table-data-icon.component.html',
  styleUrls: ['./biomarker-table-data-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableDataIconComponent {}
