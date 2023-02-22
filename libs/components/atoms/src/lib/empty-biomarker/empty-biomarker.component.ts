import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'hra-empty-biomarker',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './empty-biomarker.component.html',
  styleUrls: ['./empty-biomarker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyBiomarkerComponent {
  @Input()
  buttonText = 'Collaborate with the HRA Team';
}
