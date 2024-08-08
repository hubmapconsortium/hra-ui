import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-apps-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apps-card.component.html',
  styleUrl: './apps-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppsCardComponent {
  title = input<string>('Human Reference Atlas');
  description = input<string>(
    'Use the HRA Portal to access atlas data, explore atlas functionality, and contribute to the Human Reference Atlas.',
  );
}
