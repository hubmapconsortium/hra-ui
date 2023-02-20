import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-email-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailInputComponent {}
