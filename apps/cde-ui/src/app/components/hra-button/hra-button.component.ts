import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// interface ButtonData {
//   label: string;
//   url: string;
// }

@Component({
  selector: 'cde-hra-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hra-button.component.html',
  styleUrl: './hra-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HraButtonComponent {
  // buttonData = input<string>();
}
