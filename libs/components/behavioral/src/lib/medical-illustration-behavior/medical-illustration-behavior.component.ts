import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ftu-medical-illustration-behavior',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-illustration-behavior.component.html',
  styleUrls: ['./medical-illustration-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalIllustrationBehaviorComponent {}
