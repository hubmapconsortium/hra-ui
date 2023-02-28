import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-biomarker-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './biomarker-table.component.html',
  styleUrls: ['./biomarker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiomarkerTableComponent {}
