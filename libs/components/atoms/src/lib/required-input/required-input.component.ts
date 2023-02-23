import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-required-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './required-input.component.html',
  styleUrls: ['./required-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredInputComponent {}
