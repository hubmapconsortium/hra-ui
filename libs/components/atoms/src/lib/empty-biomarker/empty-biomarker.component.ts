import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-empty-biomarker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-biomarker.component.html',
  styleUrls: ['./empty-biomarker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyBiomarkerComponent {}
